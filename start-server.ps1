# ReSwap Website Deployment & Testing Script
# Run this script to start a local server for testing

# PowerShell script to start local server
Write-Host "🚀 Starting ReSwap Website Local Server..." -ForegroundColor Green
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
    
    # Start Python HTTP server
    Write-Host "🌐 Starting local server at http://localhost:8000" -ForegroundColor Cyan
    Write-Host "📁 Serving from: $(Get-Location)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔗 Available pages:" -ForegroundColor White
    Write-Host "   • Homepage: http://localhost:8000/index.html" -ForegroundColor Blue
    Write-Host "   • FitShare: http://localhost:8000/fitshare.html" -ForegroundColor Blue  
    Write-Host "   • NeedShare: http://localhost:8000/needshare.html" -ForegroundColor Blue
    Write-Host "   • SpaceShare: http://localhost:8000/spaceshare.html" -ForegroundColor Blue
    Write-Host "   • Test Hub: http://localhost:8000/test.html" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
    Write-Host ""
    
    # Start server
    python -m http.server 8000
    
} catch {
    Write-Host "❌ Python not found. Please install Python to run local server." -ForegroundColor Red
    Write-Host "💡 Alternative: Open the HTML files directly in your browser" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📂 File locations:" -ForegroundColor White
    Write-Host "   • $(Get-Location)\index.html" -ForegroundColor Blue
    Write-Host "   • $(Get-Location)\fitshare.html" -ForegroundColor Blue
    Write-Host "   • $(Get-Location)\needshare.html" -ForegroundColor Blue
    Write-Host "   • $(Get-Location)\test.html" -ForegroundColor Blue
}
