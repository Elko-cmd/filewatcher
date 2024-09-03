@echo off

:: Paths to your applications
set STABLE_DIFFUSION_PATH="C:\path\to\stable-diffusion\stable-diffusion.bat"  :: Update this path
set SYNCTHING_PATH="C:\path\to\syncthing\syncthing.exe"                      :: Update this path
set JS_FILE_PATH="C:\path\to\your\script.js"                                 :: Update this path

:: Open Stable Diffusion
echo Starting Stable Diffusion...
start "" %STABLE_DIFFUSION_PATH%

:: Open Syncthing
echo Starting Syncthing...
start "" %SYNCTHING_PATH%

:: Run JavaScript file with Bun
echo Running JavaScript file with Bun...
start cmd /k bun run %JS_FILE_PATH%

echo All processes started.
pause
