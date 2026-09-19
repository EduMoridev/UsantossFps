@echo off
REM @titulo: Debloat interativo e conservador
REM @categoria: manutencao
REM @descricao: Pergunta, um por um, se deve remover apps não essenciais (Clipchamp, Solitaire, Bing News/Weather etc.) só do usuário atual. Nunca remove Store, Defender, Edge ou componentes essenciais.
REM @admin: nao
REM @reversivel: sim
REM @tempo: 2-5min
REM @arquivogithub: Debloat_Interativo_Conservador.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

echo.
echo DEBLOAT INTERATIVO E CONSERVADOR
echo Remove somente o aplicativo escolhido do usuário atual.
echo Microsoft Store, Defender, Edge, Fotos, Calculadora, Terminal,
echo Web Experience e componentes essenciais NÃO serão removidos.
echo.
call :AskRemove "Clipchamp" "Clipchamp.Clipchamp"
call :AskRemove "Microsoft Solitaire Collection" "Microsoft.MicrosoftSolitaireCollection"
call :AskRemove "Notícias / Bing News" "Microsoft.BingNews"
call :AskRemove "Clima / Bing Weather" "Microsoft.BingWeather"
call :AskRemove "Obter Ajuda" "Microsoft.GetHelp"
call :AskRemove "Dicas / Introdução" "Microsoft.Getstarted"
call :AskRemove "Hub de Comentários" "Microsoft.WindowsFeedbackHub"
call :AskRemove "Vincular ao Celular / Phone Link" "Microsoft.YourPhone"
call :AskRemove "Xbox Game Bar" "Microsoft.XboxGamingOverlay"
call :AskRemove "Pessoas" "Microsoft.People"

echo.
echo Processo concluído. Aplicativos podem ser reinstalados pela Microsoft Store.
pause
exit /b 0

:AskRemove
echo.
choice /c SN /n /m "Remover %~1? [S/N]: "
if errorlevel 2 exit /b 0
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$p=Get-AppxPackage -Name '*%~2*' -ErrorAction SilentlyContinue; if($p){$p | Remove-AppxPackage -ErrorAction SilentlyContinue; Write-Host 'Solicitação concluída.'}else{Write-Host 'Aplicativo não encontrado para este usuário.'}"
exit /b 0
