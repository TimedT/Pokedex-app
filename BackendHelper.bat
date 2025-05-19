@echo off

if "%1" == "run" (
    start cmd /k "python .\backend\main.py"
) else if "%1" == "debug" (
    start cmd /k "python -m flask --debug --app .\backend\main run"
) else if "%1" == "install" (
    call pip install -r backend/requirements.txt
) else (
    echo Invalid argument. Usage: %0 [run^|debug^|install]
)