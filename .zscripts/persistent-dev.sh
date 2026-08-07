#!/bin/bash
# Persistent dev server wrapper — respawns if killed
cd /home/z/my-project
while true; do
  echo "[$(date)] Starting dev server..."
  bun run dev > /tmp/dev.log 2>&1
  EXIT=$?
  echo "[$(date)] Dev server exited with $EXIT, restarting in 3s..."
  sleep 3
done
