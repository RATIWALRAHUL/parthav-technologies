$pids = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($pids) {
    foreach ($p in $pids) {
        Write-Host "Killing process on port 3000 with PID: $p"
        Stop-Process -Id $p -Force -ErrorAction SilentlyContinue
    }
    Write-Host "Port 3000 has been successfully killed."
} else {
    Write-Host "Port 3000 is already completely free (no active process)."
}
