#!/usr/bin/env bash
# rebuild.sh — Re-deploy sennatra after pushing new code
#
# Usage (from the repo directory on the droplet):
#   ./rebuild.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo ">>> Pulling latest code..."
git pull

echo ">>> Rebuilding container..."
docker compose down
docker compose up -d --build

echo ">>> Reloading NGINX..."
nginx -t && systemctl reload nginx

echo "✓ Rebuild complete."
