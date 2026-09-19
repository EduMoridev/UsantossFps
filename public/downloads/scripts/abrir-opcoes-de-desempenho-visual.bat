@echo off
REM @titulo: Abrir opções de desempenho visual
REM @categoria: manutencao
REM @descricao: Abre o painel nativo de Opções de Desempenho do Windows e mostra sugestões de configuração de efeitos visuais.
REM @admin: nao
REM @reversivel: sim
REM @tempo: 5s
REM @arquivogithub: Abrir_Opcoes_de_Desempenho_Visual.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

echo Abrindo as Opções de Desempenho do Windows...
start "" SystemPropertiesPerformance.exe
echo.
echo Sugestão equilibrada:
echo - Desative animações que incomodam.
echo - Mantenha "Suavizar as bordas das fontes da tela".
echo - Mantenha miniaturas se você usa fotos e vídeos.
pause
