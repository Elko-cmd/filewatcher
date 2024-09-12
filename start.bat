@echo off

:: Paths to your applications
set STABLE_DIFFUSION_PATH="C:\ComfyUI_windows_portable\START Stable Diffusion SDXL Ai.lnk"  :: Update this path
set SYNCTHING_PATH="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Syncthing\Syncthing Configuration Page.lnk"                    :: Update this path
set JS_FILE_PATH="C:\Users\nm\Desktop\Museumsnacht\filewatcher\main.js"                                 :: Update this path

:: Open Stable Diffusion
echo Starting Stable Diffusion...
start "" %STABLE_DIFFUSION_PATH% || echo Stable Diffusion failed to start & pause

:: Ask user to start Syncthing
set /p answer=Do you want to start Syncthing? (y/n): 
if /i "%answer%"=="y" (
    echo Starting Syncthing...
    start "" %SYNCTHING_PATH% || echo Syncthing failed to start & pause
) else (
    echo Skipping Syncthing.
)
:: Run JavaScript file with Bun
echo Running JavaScript file with Bun...
start cmd /k bun run %JS_FILE_PATH% || echo JavaScript file failed to run & pause

echo All processes started.
pause

