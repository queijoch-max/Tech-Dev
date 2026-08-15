# ==============================
# LANCE LE BACKEND ET LE FRONTEND
# ==============================

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm start"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host "Backend et frontend lances, chacun dans sa propre fenetre."
