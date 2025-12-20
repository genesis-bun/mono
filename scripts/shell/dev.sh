#!/bin/bash
clear;

echo "🗄️ Creating database..."
bun run scripts/application/create-db.ts
echo

echo "⬆️ Pushing schema to database..."
bun push
echo

echo "🔍 Checking code..."
bun check
echo

if [ "$1" = "--legacy" ]; then
    bun run dev.ts
else
    bun run server.ts
fi
echo