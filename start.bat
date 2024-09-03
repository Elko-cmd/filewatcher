@echo off

:: Paths to your applications
set STABLE_DIFFUSION_PATH="C:\ComfyUI_windows_portable\START Stable Diffusion SDXL Ai.lnk"  :: Update this path
set SYNCTHING_PATH="C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Syncthing\Syncthing Configuration Page.lnk"                    :: Update this path
set JS_FILE_PATH="C:\Users\nm\Desktop\Museumsnacht\filewatcher\main.js"                                 :: Update this path

:: Open Stable Diffusion
echo Starting Stable Diffusion...
start "" %STABLE_DIFFUSION_PATH% || echo Stable Diffusion failed to start & pause

:: Open Syncthing
echo Starting Syncthing...
start "" %SYNCTHING_PATH% || echo Syncthing failed to start & pause

:: Run JavaScript file with Bun
echo Running JavaScript file with Bun...
start cmd /k bun run %JS_FILE_PATH% || echo JavaScript file failed to run & pause

echo All processes started.
pause

