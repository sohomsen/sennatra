#!/usr/bin/env bash
# deploy.sh — First-time production deployment for sennatra
#
# Usage:
#   DOMAIN_NAME=yourdomain.com ./deploy.sh
#
# Assumes: Ubuntu/Debian droplet, run as root or with sudo
set -euo pipefail

# ── Validate required env var ─────────────────────────────────────────────────
: "${DOMAIN_NAME:?DOMAIN_NAME must be set. Run: DOMAIN_NAME=yourdomain.com ./deploy.sh}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── Install Docker (idempotent) ───────────────────────────────────────────────
if ! command -v docker &>/dev/null; then
  echo ">>> Installing Docker..."
  curl -fsSL https://get.docker.com | sh
  systemctl enable --now docker
else
  echo ">>> Docker already installed: $(docker --version)"
fi

# ── Install NGINX ─────────────────────────────────────────────────────────────
if ! command -v nginx &>/dev/null; then
  echo ">>> Installing NGINX..."
  apt-get update -y && apt-get install -y nginx
  systemctl enable --now nginx
else
  echo ">>> NGINX already installed: $(nginx -v 2>&1)"
fi

# ── Install Certbot ───────────────────────────────────────────────────────────
if ! command -v certbot &>/dev/null; then
  echo ">>> Installing Certbot..."
  apt-get update -y && apt-get install -y certbot python3-certbot-nginx
else
  echo ">>> Certbot already installed: $(certbot --version)"
fi

# ── Ensure .env.production exists ─────────────────────────────────────────────
if [[ ! -f "$SCRIPT_DIR/.env.production" ]]; then
  echo "ERROR: .env.production not found."
  echo "       Copy .env.production.example → .env.production and fill in your values."
  exit 1
fi

# ── Build and start the container ─────────────────────────────────────────────
echo ">>> Building and starting sennatra_web..."
cd "$SCRIPT_DIR"
docker compose up -d --build

# ── Configure NGINX ───────────────────────────────────────────────────────────
echo ">>> Configuring NGINX for ${DOMAIN_NAME}..."
sed "s/DOMAIN_NAME/${DOMAIN_NAME}/g" \
  "$SCRIPT_DIR/nginx/sennatra.conf" \
  > /etc/nginx/sites-available/sennatra

ln -sf /etc/nginx/sites-available/sennatra \
       /etc/nginx/sites-enabled/sennatra

# Remove default site if it's still enabled (conflicts on port 80)
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx

# ── Obtain SSL certificate ────────────────────────────────────────────────────
echo ">>> Obtaining SSL certificate for ${DOMAIN_NAME}..."
certbot --nginx \
  -d "${DOMAIN_NAME}" \
  --non-interactive \
  --agree-tos \
  --redirect \
  --email "admin@${DOMAIN_NAME}"

echo ""
echo "✓ sennatra is live at https://${DOMAIN_NAME}"
