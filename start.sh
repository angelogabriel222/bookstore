#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}========================================"
echo "  Bookstore - Starting dev servers"
echo "========================================${NC}"

# Check Ruby
if ! command -v ruby &>/dev/null; then
    echo -e "${RED}Ruby not found. Install it with:${NC}"
    echo -e "  rbenv install 3.3.3 && rbenv global 3.3.3"
    echo -e "  # or use rvm/asdf"
    exit 1
fi

# Check Node
if ! command -v node &>/dev/null; then
    echo -e "${RED}Node.js not found. Install it with nvm or your package manager.${NC}"
    exit 1
fi

# Backend deps
if [ ! -d "$ROOT_DIR/ror_bookstore/vendor/bundle" ] && ! command -v bundle &>/dev/null; then
    echo -e "${YELLOW}[Backend] Installing gems...${NC}"
    cd "$ROOT_DIR/ror_bookstore"
    gem install bundler
    bundle install
fi

# Frontend deps
if [ ! -d "$ROOT_DIR/ror_bookstore_frontend/node_modules" ]; then
    echo -e "${YELLOW}[Frontend] Installing npm packages...${NC}"
    cd "$ROOT_DIR/ror_bookstore_frontend"
    npm install
fi

cleanup() {
    echo -e "\n${YELLOW}Stopping servers...${NC}"
    kill "$BACKEND_PID" 2>/dev/null
    kill "$FRONTEND_PID" 2>/dev/null
    wait "$BACKEND_PID" 2>/dev/null
    wait "$FRONTEND_PID" 2>/dev/null
    echo -e "${GREEN}Done.${NC}"
    exit 0
}

trap cleanup INT TERM

# Backend env (PostgreSQL, Redis, etc.)
if [ -f "$ROOT_DIR/ror_bookstore/.env" ]; then
    set -a
    # shellcheck source=/dev/null
    source "$ROOT_DIR/ror_bookstore/.env"
    set +a
elif [ ! -f "$ROOT_DIR/ror_bookstore/.env" ] && [ -f "$ROOT_DIR/ror_bookstore/.env.example" ]; then
    echo -e "${YELLOW}[Backend] Crea ror_bookstore/.env desde .env.example (PGPASSWORD, etc.)${NC}"
fi

# Backend
echo -e "${GREEN}[Backend] Starting Rails server (port 3010)...${NC}"
cd "$ROOT_DIR/ror_bookstore"
bin/rails server --port 3010 2>&1 | sed "s/^/${GREEN}[Backend]${NC} /" &
BACKEND_PID=$!

# Frontend
echo -e "${BLUE}[Frontend] Starting Vite dev server (port 5173)...${NC}"
cd "$ROOT_DIR/ror_bookstore_frontend"
npm run dev 2>&1 | sed "s/^/${BLUE}[Frontend]${NC} /" &
FRONTEND_PID=$!

echo -e "\n${YELLOW}Backend PID:  $BACKEND_PID${NC}"
echo -e "${YELLOW}Frontend PID: $FRONTEND_PID${NC}"
echo -e "${GREEN}Press Ctrl+C to stop both servers${NC}\n"

wait
