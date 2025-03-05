from backend.database.database_config import type
FRONTEND_CONFIG_FILE = "frontend/src/api/config.js"

def strip_whitespace(line):
    """
    Strip leading and trailing whitespace from a line.

    Args:
        line (str): The input line.

    Returns:
        str: The line with leading and trailing whitespace removed.
    """
    return line.replace(" ", "").replace("\t", "").replace("\n", "")

SERVER_DEFINED = False

with open(FRONTEND_CONFIG_FILE, "r") as file:
    lines = file.readlines()
    print (lines)
    for line in lines:
        line = strip_whitespace(line)
        print (line)
        # For each line, check if it is a comment
        if line[0] != "/" and line[1] != "/":
            # If the line is a variable definition
            if 'constserverURL="http://dolphinflashcards.com/api/";' in line:
                SERVER_DEFINED = True
            # If the line exports the variable
            elif 'exportdefaultserverURL;' in line:
                if SERVER_DEFINED:
                    print("Frontend server URL is defined correctly")
                else:
                    raise ValueError("Frontend server URL is defined but not exported, or defined incorrectly")

# If the server URL is not defined
if SERVER_DEFINED is False:
    raise ValueError("Frontend server URL is not defined")

if type != "production":
    raise ValueError("Database config is not set to production!")
else:
    print("Database config is set to production correctly")
