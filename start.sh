#!/usr/bin/env bash
set -e

echo "================================================================="
echo "   AEGISGUARD CYBER ADVISORY PORTAL - CLUSTER BOOTSTRAPPER       "
echo "   Client: Nexor Digital Bank | MPMIS 516 ISS Risk Assessment   "
echo "================================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

# 1. Dependency checks
if ! command -v node >/dev/null 2>&1; then
    echo "[!] Node.js is required but not installed or not in PATH."
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "[!] npm is required but not installed or not in PATH."
    exit 1
fi

echo "[+] Node version: $(node -v)"
echo "[+] NPM version:  $(npm -v)"

# 2. Check and install dependencies
if [ ! -d "node_modules" ] || [ ! -d "apps/api/node_modules" ] || [ ! -d "apps/client/node_modules" ]; then
    echo "[+] Installing monorepo dependencies across workspaces..."
    npm install
fi

echo "================================================================="
echo "[+] Booting NestJS Backend API (Port 3000)..."
echo "[+] Booting React Vite Frontend (Port 5173)..."
echo "================================================================="
echo "[*] Open in browser: http://localhost:5173"
echo "[*] Direct API test: http://localhost:3000/api/controls"
echo "================================================================="

npm run dev
