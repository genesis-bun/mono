#!/bin/bash
if [ "$1" = "--legacy" ]; then
    NODE_ENV=production bun run prod.ts
    echo
else
    NODE_ENV=production bun run server.ts
    echo
fi