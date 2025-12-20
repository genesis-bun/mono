#!/bin/bash
clear;

echo "🔍 Installing project dependencies..."
bun install
echo

echo "🗄️ Creating database..."
bun run scripts/application/create-db.ts
echo

echo "⬆️ Pushing schema to database..."
bun push
echo

echo "🔍 Linting and formatting code..."
bun check
echo

if [ "$1" = "--legacy" ]; then
    echo "🗂️ Building project..."
    bun run build
    echo
    
    echo "⚡ Starting production server..."
    bun run start:legacy
    echo
else
    echo "⚡ Spinning up production server..."
    bun run start
    echo
fi

echo "✅ Deployment completed successfully!"
