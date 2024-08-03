#!/bin/bash

# Start ngrok and get the URL
ngrok http 3000 > /dev/null &
NGROK_PID=$!

# Allow ngrok to start
sleep 5

# Get the ngrok URL
NGROK_URL=$(curl -s localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')
if [ -z "$NGROK_URL" ]; then
  echo "Failed to get ngrok URL. Exiting."
  kill $NGROK_PID
  exit 1
fi
echo "ngrok URL: $NGROK_URL"

# Update .env file
sed -i '' "s|PUBLIC_URL=.*|PUBLIC_URL=$NGROK_URL|" .env

# Restart the Node.js server to pick up the new URL
pkill node
npx ts-node src/index.ts

# Stop ngrok
kill $NGROK_PID