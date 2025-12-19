#!/bin/bash
clear; bun run scripts/application/create-db.ts && bun push && bun check && bun serve:dev