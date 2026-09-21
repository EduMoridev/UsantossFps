@echo off
REM @titulo: Otimizar unidades (TRIM e desfragmentação)
REM @categoria: manutencao
REM @descricao: Roda a otimização nativa do Windows em todas as unidades fixas — TRIM em SSD/NVMe, desfragmentação em HD — a mesma tarefa que o Windows já roda automaticamente toda semana.
REM @admin: sim
REM @reversivel: sim
REM @tempo: 5-30min
REM @arquivogithub: Otimizar_Unidades_TRIM_e_Defrag.bat
chcp 65001 >nul
setlocal EnableExtensions
title Santos FPS - Ferramenta Segura

net session >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Execute como administrador.
  pause
  exit /b 1
)

echo O comando /O escolhe a operação adequada para cada tipo de mídia.
echo Em SSD/NVMe, o Windows usa otimização/TRIM quando aplicável.
echo.
choice /c SN /n /m "Otimizar todas as unidades fixas agora? [S/N]: "
if errorlevel 2 exit /b 0

defrag.exe /C /O /U /V
pause
