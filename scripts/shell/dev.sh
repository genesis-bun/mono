#!/bin/bash
clear;

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