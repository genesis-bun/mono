#!/bin/bash
clear;

echo "⬆️ Pushing schema to database..."
bun push
echo

echo "🔍 Checking code..."
bun check
echo

echo "⚡ Starting development server..."
bun run server.ts
echo