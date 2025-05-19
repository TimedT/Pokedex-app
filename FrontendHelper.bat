@echo off

if "%1" == "run" (
    start cmd /k "cd frontend && npm run dev && cd ..\.."
) else if "%1" == "build" (
    call cd frontend  
    call npm run build
    call cd ..\..
) else if "%1" == "install" (
    call cd frontend
    call npm install
    call npm install react-bootstrap react-router-dom bootstrap
    call cd ..\..
) else (
    echo Invalid argument. Usage: %0 [run^|install]
)