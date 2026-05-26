#!/bin/bash
set -e

echo "▶ Building & starting API server on port 5001..."
PORT=5001 NODE_ENV=development pnpm --filter @workspace/api-server run dev &
API_PID=$!

cleanup() {
  echo "Shutting down..."
  kill $API_PID 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "⏳ Waiting for API to be ready..."
for i in $(seq 1 30); do
  if curl -sf http://localhost:5001/api/healthz > /dev/null 2>&1; then
    echo "✅ API ready!"
    break
  fi
  sleep 1
done

echo "▶ Starting frontend on port 5000..."
pnpm run dev
