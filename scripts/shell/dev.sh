#!/bin/bash
bun run scripts/application/create-db.ts && bun push && bun check && bun serve:dev