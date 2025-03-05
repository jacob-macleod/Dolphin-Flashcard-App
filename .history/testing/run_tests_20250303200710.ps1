# Windows PowerShell script for running tests
# run this script from root directory 
# run ./testing/run_tests.ps1
# Start Firestore emulator in background\
Write-Host "running firebase."
Start-Process powershell -ArgumentList "-File firebase_emulator.ps1" -WindowStyle Hidden

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
docker rm -f firestore-emulator
# Exit with the pytest return status
exit $ERROR_RETURN_STATUS





