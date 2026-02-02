#!/usr/bin/env bash

set -euo pipefail

# Delete node_modules directories
find . -type d -name "node_modules" -exec rm -rf {} +

# Delete bun.lock files
find . -type f -name "bun.lock" -exec rm -f {} +

# Install dependencies
bun install

echo "Fresh installation complete."
