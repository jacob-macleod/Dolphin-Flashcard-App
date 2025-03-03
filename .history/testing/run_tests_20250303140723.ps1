# Windows PowerShell script for running tests

# Start Firestore emulator in background
Start-Process powershell -ArgumentList "-File firebase_emulator.ps1" -WindowStyle Hidden

Write-Host "Installing requirements..."
python -m venv env
& .\env\Scripts\Activate.ps1
pip install -r requirements.txt | Out-Null
pip install pytest | Out-Null
Write-Host "Running tests..." -ForegroundColor Green

try {
    pytest testing/
    $ERROR_RETURN_STATUS = $LASTEXITCODE
    if ($ERROR_RETURN_STATUS -eq 0) {
        Write-Host "All tests passed!" -ForegroundColor Green
    } else {
        Write-Host "Tests failed with exit code $ERROR_RETURN_STATUS" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error running tests: $_" -ForegroundColor Red
    $ERROR_RETURN_STATUS = 1
}

# Deactivate the virtual environment
deactivate

# Exit with the pytest return status
exit $ERROR_RETURN_STATUS




