@echo off
echo Running npm install...
cmd /c "npm link && npm install -g ."
echo.
echo Global script location.
where task-tracker

echo.
echo Installation completed.
pause