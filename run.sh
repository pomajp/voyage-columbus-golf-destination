#!/bin/bash

echo "⛳ Starting The Voyage Pitch Deck..."
echo ""
echo "Opening in your default browser..."

# Try to detect the OS and open browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open http://localhost:8080 &
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open http://localhost:8080 &
else
    echo "Please open http://localhost:8080 in your browser"
fi

# Start the server
echo ""
echo "Starting server on port 8080..."
echo "Press Ctrl+C to stop"
echo ""
python3 -m http.server 8080
