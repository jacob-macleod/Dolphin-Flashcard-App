# Windows PowerShell script for running tests
# run this script from root directory 
# run ./testing/run_tests.ps1

# Check if already in virtual environment
$inEnvironment = $false
if ($env:VIRTUAL_ENV) {
    Write-Host "Already in virtual environment" -ForegroundColor Green
    $inEnvironment = $true
}

# Start Firestore emulator in background
Write-Host "Running firebase emulator..."
Start-Process powershell -ArgumentList "-File firebase_emulator.ps1" -WindowStyle Hidden

# Create and activate virtual environment if not already in one
if (-not $inEnvironment) {
    Write-Host "Setting up virtual environment..." -ForegroundColor Green
    
    # Check if environment exists
    if (-not (Test-Path ".\env")) {
        Write-Host "Creating virtual environment..."
        python -m venv env
    }
    
    # Activate environment
    Write-Host "Activating virtual environment..."
    & .\env\Scripts\Activate.ps1
    
    # Ensure activation worked
    if (-not $env:VIRTUAL_ENV) {
        Write-Host "Failed to activate virtual environment. Exiting." -ForegroundColor Red
        exit 1
    }
}

Write-Host "Installing requirements..."
# Install requirements using activated environment
python -m pip install -r requirements.txt | Out-Null
python -m pip install pytest | Out-Null
Write-Host "Running tests..." -ForegroundColor Green


try {
    python -m pytest testing/
    $ERROR_RETURN_STATUS = $LASTEXITCODE
    
    if ($ERROR_RETURN_STATUS -eq 0) {
        docker rm -f firestore-emulator
        Write-Host "All tests passed!" -ForegroundColor Green
    } else {
        docker rm -f firestore-emulator
        Write-Host "Tests failed with exit code $ERROR_RETURN_STATUS" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error running tests: $_" -ForegroundColor Red
    $ERROR_RETURN_STATUS = 1
}

# Deactivate the environment only if we activated it in this script
if (-not $inEnvironment) {
    Write-Host "Deactivating virtual environment..."
    deactivate
}

# Exit with the pytest return status
exit $ERROR_RETURN_STATUS