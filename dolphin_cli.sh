#!/bin/bash

# Dolphin Flashcards Management Script (WSL/Windows Hybrid)
SCRIPT_DIR=$(dirname "$(realpath "$0")")
IS_WSL_PARAM=""

# Check if IS_WSL was provided as a parameter
for arg in "$@"; do
    if [[ "$arg" == "--wsl="* ]]; then
        IS_WSL_PARAM="${arg#*=}"
        break
    fi
done

# Set IS_WSL based on parameter or auto-detect
if [ -n "$IS_WSL_PARAM" ]; then
    IS_WSL="$IS_WSL_PARAM"
    echo "Using provided IS_WSL value: $IS_WSL"
else
    IS_WSL=$(uname -a | grep -i microsoft | wc -l)
fi

# Status files
MAIN_PID_FILE="$SCRIPT_DIR/.backend_pid"
DATABASE_STATUS_FILE="$SCRIPT_DIR/.database_status"
DATABASE_DELETE_LOG="$SCRIPT_DIR/.database_delete_log"
FRONTEND_PID_FILE="$SCRIPT_DIR/.frontend_pid"
DOCS_PID_FILE="$SCRIPT_DIR/.docs_pid"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Initialize status files
initialize_status_files() {
    [ ! -f "$DATABASE_STATUS_FILE" ] && echo "stopped" > "$DATABASE_STATUS_FILE"
    [ ! -f "$DATABASE_DELETE_LOG" ] && echo "Never deleted" > "$DATABASE_DELETE_LOG"
}

# Path conversion for WSL
win_path() {
    echo "$1" | sed -e 's/^\/mnt\/\([a-z]\)/\1:/' -e 's/\//\\/g'
}

# Cross-platform command execution
run_cmd() {
    if [ $IS_WSL -gt 0 ]; then
        local win_cmd=$(echo "$@" | sed "s|$SCRIPT_DIR|$(win_path "$SCRIPT_DIR")|g")
        powershell.exe -Command "cd ~; $win_cmd"
    else
        eval "$@"
    fi
}

show_help() {
    echo -e "${BLUE}Management Script Usage:${NC}"
    echo -e "  ${GREEN}database${NC} [start|stop|status|delete_data]"
    echo -e "  ${GREEN}backend${NC} [start|stop|status]"
    echo -e "  ${GREEN}frontend${NC} [start|stop|status|build]"
    echo -e "  ${GREEN}docs${NC} [start|stop|status]"
    echo -e "  ${GREEN}test${NC} run"
    echo -e "  ${GREEN}config${NC} check"
    echo -e "  ${GREEN}help${NC}"
    echo -e "  Use ${GREEN}--wsl=1${NC} or ${GREEN}--wsl=0${NC} to manually set WSL mode"
}

# Database functions
start_database() {
    EMULATOR_SCRIPT="$SCRIPT_DIR/firebase_emulator.sh"
    [ "$(cat "$DATABASE_STATUS_FILE")" == "running" ] && \
        { echo -e "${YELLOW}Database already running${NC}"; return; }
    
    echo -e "${BLUE}Starting database...${NC}"

    # Ensure the script is in Unix format (convert if needed)
    if file "$EMULATOR_SCRIPT" | grep -q "CRLF"; then
        echo -e "${YELLOW}Converting firebase_emulator.sh to Unix format...${NC}"
        dos2unix "$EMULATOR_SCRIPT" >/dev/null 2>&1 || sed -i 's/\r$//' "$EMULATOR_SCRIPT"
    fi
    bash "$EMULATOR_SCRIPT" &
    sleep 10
    
    if docker ps | grep -q "mtlynch/firestore-emulator-docker"; then
        echo "running" > "$DATABASE_STATUS_FILE"
        echo -e "${GREEN}Database started${NC}"
    else
        echo -e "${RED}Database failed to start${NC}"
    fi
}

stop_database() {
    docker stop $(docker ps -q --filter "ancestor=mtlynch/firestore-emulator-docker") 2>/dev/null
    echo "stopped" > "$DATABASE_STATUS_FILE"
    echo -e "${GREEN}Database stopped${NC}"
}

delete_database_data() {
    [ "$(cat "$DATABASE_STATUS_FILE")" != "running" ] && \
        { echo -e "${RED}Start database first${NC}"; return 1; }
    
    curl -X DELETE "http://localhost:8080/emulator/v1/projects/dummy-project-id/databases/(default)/documents" && {
        date "+%Y-%m-%d %H:%M:%S" > "$DATABASE_DELETE_LOG"
        echo -e "${GREEN}Data deleted${NC}"
    } || echo -e "${RED}Data deletion failed${NC}"
}

database_status() {
    if docker ps | grep -q "mtlynch/firestore-emulator-docker"; then
        echo -e "${GREEN}Database running${NC}"
    else
        echo -e "${RED}Database stopped${NC}"
    fi
    echo -e "Last data deletion: $(cat "$DATABASE_DELETE_LOG")"
}

# Backend functions
start_backend() {
    if [ $IS_WSL -gt 0 ]; then
        # First check if the backend is already running
        if run_cmd "Get-Process python -ErrorAction SilentlyContinue" | grep -q "python"; then
            echo -e "${YELLOW}Backend already running in Windows${NC}"
            return
        fi
        
        # Start the Python process with Start-Process to properly detach it
        run_cmd "Start-Process -NoNewWindow python -ArgumentList \"$(win_path "$SCRIPT_DIR/backend/main.py")\"" &
        # Sleep briefly to allow the process to start
        echo $! > "$MAIN_PID_FILE"
        sleep 2
        echo -e "${GREEN}Backend started in Windows${NC}"
    else
        [ -f "$MAIN_PID_FILE" ] && {
            ps -p $(cat "$MAIN_PID_FILE") >/dev/null && \
                { echo -e "${YELLOW}Backend already running${NC}"; return; } || rm "$MAIN_PID_FILE"
        }
        python3 "$SCRIPT_DIR/backend/main.py" &
        echo $! > "$MAIN_PID_FILE"
        echo -e "${GREEN}Backend started${NC}"
    fi
}

stop_backend() {
    if [ $IS_WSL -gt 0 ]; then
        run_cmd "Stop-Process -Name python -ErrorAction SilentlyContinue"
    else
        [ -f "$MAIN_PID_FILE" ] && kill $(cat "$MAIN_PID_FILE") 2>/dev/null
    fi
    rm -f "$MAIN_PID_FILE"
    echo -e "${GREEN}Backend stopped${NC}"
}

backend_status() {
    if [ $IS_WSL -gt 0 ]; then
        # Check if PID file exists and then check if the process is running
        [ -f "$MAIN_PID_FILE" ] && {
            # In WSL, we need to check if a Python process is running at all, as we can't see args
            run_cmd "Get-Process python -ErrorAction SilentlyContinue" | grep -q "python" && \
                echo -e "${GREEN}Backend running in Windows${NC}" || \
                echo -e "${RED}Backend stopped${NC}"
        } || echo -e "${RED}Backend stopped${NC}"
    else
        [ -f "$MAIN_PID_FILE" ] && ps -p $(cat "$MAIN_PID_FILE") >/dev/null && \
            echo -e "${GREEN}Backend running (PID: $(cat "$MAIN_PID_FILE"))${NC}" || \
            echo -e "${RED}Backend stopped${NC}"
    fi
}

# Frontend functions
start_frontend() {
    # Check for existing PID file first
    if [ -f "$FRONTEND_PID_FILE" ]; then
        echo -e "${YELLOW}Frontend PID file exists, checking if process is running${NC}"
        if [ $IS_WSL -gt 0 ]; then
            # For WSL, verify using process checks
            if ps -eaf | grep -q "[p]owershell.*npm run start"; then
                echo -e "${YELLOW}Frontend already running in Windows${NC}"
                return
            fi
        else
            # For Linux, check using the PID
            if ps -p $(cat "$FRONTEND_PID_FILE") >/dev/null; then
                echo -e "${YELLOW}Frontend already running${NC}"
                return
            else
                # PID file exists but process doesn't, clean up
                rm -f "$FRONTEND_PID_FILE"
            fi
        fi
    fi

    # Additional check for WSL
    if [ $IS_WSL -gt 0 ]; then
        # Check for existing frontend process using Windows PowerShell
        if run_cmd "Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {\$_.CommandLine -like '*react-scripts*'} | Select-Object -First 1" | grep -q "node"; then
            echo -e "${YELLOW}Frontend already running in Windows${NC}"
            return
        fi

        # Start the frontend
        run_cmd "cd '$(win_path "$SCRIPT_DIR/frontend")' ; npm run start" &
        sleep 3
        echo $! > "$FRONTEND_PID_FILE"
        echo -e "${GREEN}Frontend started in Windows${NC}"
    else
        # Start the frontend for Linux
        cd "$SCRIPT_DIR/frontend" && npm start >/dev/null 2>&1 &
        echo $! > "$FRONTEND_PID_FILE"
        echo -e "${GREEN}Frontend started${NC}"
    fi
}


build_frontend() {
    if [ $IS_WSL -gt 0 ]; then
        run_cmd "cd '$(win_path "$SCRIPT_DIR/frontend")' ; npm run build"
    else
        cd "$SCRIPT_DIR/frontend" && npm run build
    fi
    echo -e "${GREEN}Frontend built${NC}"
}

stop_frontend() {
    if [ $IS_WSL -gt 0 ]; then
        run_cmd "Stop-Process -Name node -ErrorAction SilentlyContinue"
    else
        [ -f "$FRONTEND_PID_FILE" ] && kill $(cat "$FRONTEND_PID_FILE") 2>/dev/null
    fi
    rm -f "$FRONTEND_PID_FILE"
    echo -e "${GREEN}Frontend stopped${NC}"
}

frontend_status() {
    if [ $IS_WSL -gt 0 ]; then
        # First check using ps if we can detect npm running inside PowerShell
        if ps -eaf | grep -q "[p]owershell.*npm run*"; then
            echo -e "${GREEN}Frontend running in Windows${NC}"
            return
        fi

        # If direct check fails, try using run_cmd to detect the process in Windows
        if run_cmd "Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {\$_.CommandLine -like '*react-scripts*'} | Select-Object -First 1" | grep -q "node"; then
            echo -e "${GREEN}Frontend running in Windows${NC}"
        else
            echo -e "${RED}Frontend stopped${NC}"
        fi
    else
        [ -f "$FRONTEND_PID_FILE" ] && ps -p $(cat "$FRONTEND_PID_FILE") >/dev/null && \
            echo -e "${GREEN}Frontend running (PID: $(cat "$FRONTEND_PID_FILE"))${NC}" || \
            echo -e "${RED}Frontend stopped${NC}"
    fi
}


# Documentation functions
start_docs() {
    if [ -f "$DOCS_PID_FILE" ]; then
        echo -e "${YELLOW}Checking if process is running${NC}"
        if [ $IS_WSL -gt 0 ]; then
            # For WSL, we'll verify through process checks
            if ps -eaf | grep -q "[p]owershell.*mintlify"; then
                echo -e "${YELLOW}Documentation Server already running in Windows${NC}"
                return
            fi
        else
            # For Linux, check using the PID
            if ps -p $(cat "$DOCS_PID_FILE") >/dev/null; then
                echo -e "${YELLOW}Documentation Server already running${NC}"
                return
            else
                rm -f "$DOCS_PID_FILE"
            fi
        fi
    fi
    
    # Additional check for WSL
    if [ $IS_WSL -gt 0 ]; then
        # Check for mintlify processes via Windows commands
        if run_cmd "Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {\$_.CommandLine -like '*mintlify*'} | Select-Object -First 1" | grep -q "node"; then
            echo -e "${YELLOW}Docs already running in Windows${NC}"
            return
        fi
        
        # Start the docs
        run_cmd "cd '$(win_path "$SCRIPT_DIR/docs")' ; mintlify dev --port 3333" &
        sleep 3
        echo $! > "$DOCS_PID_FILE"
        echo -e "${GREEN}Docs started in Windows (http://localhost:3333)${NC}"
    else
        # Start the docs for Linux
        cd "$SCRIPT_DIR/docs" && mintlify dev --port 3333 &
        echo $! > "$DOCS_PID_FILE"
        echo -e "${GREEN}Docs started (http://localhost:3333)${NC}"
    fi
}

stop_docs() {
    if [ $IS_WSL -gt 0 ]; then
        # Find the init process that's running the PowerShell command for mintlify
        INIT_PID=$(ps -eaf | grep "[p]owershell.*mintlify" | awk '{print $2}')
        if [ ! -z "$INIT_PID" ]; then
            # Kill the init process directly
            kill -9 $INIT_PID 2>/dev/null
            rm -f "$DOCS_PID_FILE"
            echo -e "${GREEN}Documentation Server stopped${NC}"
        else
            run_cmd "Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {\$_.CommandLine -like '*mintlify*'} | Stop-Process -Force -ErrorAction SilentlyContinue"
            run_cmd "Get-Process -Name powershell -ErrorAction SilentlyContinue | Where-Object {\$_.CommandLine -like '*mintlify*'} | Stop-Process -Force -ErrorAction SilentlyContinue"
            rm -f "$DOCS_PID_FILE"
            echo -e "${GREEN}Documentation Server stopped${NC}"
        fi
    else
        [ -f "$DOCS_PID_FILE" ] && kill $(cat "$DOCS_PID_FILE") 2>/dev/null
        rm -f "$DOCS_PID_FILE"
        echo -e "${GREEN}Documentation Server stopped${NC}"
    fi
}

docs_status() {
    if [ $IS_WSL -gt 0 ]; then
        if ps -eaf | grep -q "[p]owershell.*mintlify"; then
            echo -e "${GREEN}Documentation Server running in Windows${NC}"
            return
        fi
        
        if run_cmd "Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {\$_.CommandLine -like '*mintlify*'} | Select-Object -First 1" | grep -q "node"; then
            echo -e "${GREEN}Documentation Server running in Windows${NC}"
        else
            echo -e "${RED}Documentation Server stopped${NC}"
        fi
    else
        [ -f "$DOCS_PID_FILE" ] && ps -p $(cat "$DOCS_PID_FILE") >/dev/null && \
            echo -e "${GREEN}Documentation Server running (PID: $(cat "$DOCS_PID_FILE"))${NC}" || \
            echo -e "${RED}Documentation Server stopped${NC}"
    fi
}

# Test and config functions
run_tests() {
    echo -e "${BLUE}Running tests...${NC}"
    
    TEST_SCRIPT="$SCRIPT_DIR/testing/run_tests.sh"

    if [ ! -f "$TEST_SCRIPT" ]; then
        echo -e "${RED}Test script missing${NC}"
        return 1
    fi

    # Ensure the script is in Unix format (convert if needed)
    if file "$TEST_SCRIPT" | grep -q "CRLF"; then
        echo -e "${YELLOW}Converting run_tests.sh to Unix format...${NC}"
        dos2unix "$TEST_SCRIPT" >/dev/null 2>&1 || sed -i 's/\r$//' "$TEST_SCRIPT"
    fi

    # Execute the script
    bash "$TEST_SCRIPT"
}


check_config() {
    echo -e "${BLUE}Checking config...${NC}"
    local db_config_ok=true
    local fe_config_ok=true

    CONFIG_FILE="$SCRIPT_DIR/backend/database/database_config.py"
    CONFIG_JS="$SCRIPT_DIR/frontend/src/api/config.js"

    if [ ! -f "$CONFIG_FILE" ]; then
        echo -e "${RED}Database config missing${NC}"
        db_config_ok=false
    else

        echo -e "${GREEN}Database config found${NC}"

        if ! grep -q '^[^#]*type\s*=\s*' "$CONFIG_FILE"; then
            echo -e "${RED}ERROR: 'type' is not set in the database config.${NC}"
            echo -e "${YELLOW}Please add 'type=\"production\"' before committing.${NC}"
            db_config_ok=false
        

        elif grep -q '^[^#]*type\s*=\s*"local"' "$CONFIG_FILE"; then
            echo -e "${YELLOW}WARNING: Database config is set to 'local'.${NC}"
            echo -e "${RED}Please change it to 'production' before committing.${NC}"
            db_config_ok=false
        else

            echo -e "${GREEN}Database config is set correctly.${NC}"
        fi
    fi

    if [ ! -f "$CONFIG_JS" ]; then
        echo -e "${RED}Frontend API config missing: $CONFIG_JS${NC}"
        fe_config_ok=false
    else

        echo -e "${GREEN}Frontend API config found${NC}"

        if ! grep -q '^[[:space:]]*const serverURL\s*=' "$CONFIG_JS"; then
            echo -e "${RED}ERROR: serverURL is not set in config.js.${NC}"
            echo -e "${YELLOW}Please set the correct API URL before committing.${NC}"
            fe_config_ok=false
        

        elif grep -q '^[[:space:]]*//[[:space:]]*const serverURL\s*=\s*"http://dolphinflashcards.com/api/";' "$CONFIG_JS" && \
        grep -q '^[[:space:]]*const serverURL\s*=\s*"http://127.0.0.1:5000/api/";' "$CONFIG_JS"; then
            echo -e "${YELLOW}WARNING: Localhost API is active.${NC}"
            echo -e "${RED}Please switch to the production API before committing.${NC}"
            fe_config_ok=false
        else

            echo -e "${GREEN}Frontend API config is set correctly.${NC}"
        fi
    fi

    if [ "$db_config_ok" = true ] && [ "$fe_config_ok" = true ]; then
        return 0
    else
        return 1
    fi
}


initialize_status_files

# Filter out --wsl parameter before handling other commands
ARGS=()
for arg in "$@"; do
    if [[ "$arg" != "--wsl="* ]]; then
        ARGS+=("$arg")
    fi
done

[ ${#ARGS[@]} -eq 0 ] && { show_help; exit 0; }

case ${ARGS[0]} in
    database)
        case ${ARGS[1]} in
            start) start_database ;;
            stop) stop_database ;;
            status) database_status ;;
            delete_data) delete_database_data ;;
            *) show_help ;;
        esac ;;
    backend)
        case ${ARGS[1]} in
            start) start_backend ;;
            stop) stop_backend ;;
            status) backend_status ;;
            *) show_help ;;
        esac ;;
    frontend)
        case ${ARGS[1]} in
            start) start_frontend ;;
            stop) stop_frontend ;;
            status) frontend_status ;;
            build) build_frontend ;;
            *) show_help ;;
        esac ;;
    docs)
        case ${ARGS[1]} in
            start) start_docs ;;
            stop) stop_docs ;;
            status) docs_status ;;
            *) show_help ;;
        esac ;;
    test) run_tests ;;
    config) check_config ;;
    help) show_help ;;
    *) show_help ;;
esac

