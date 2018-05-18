#!/bin/bash

PIXELWALL_HOME="${HOME}/pixelwall"

echo "Start Pixel Wall"

run_app() {
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

  sudo /sbin/ldconfig

  echo "nvm version"
  nvm --version
  echo "node version"
  node --version
  echo "npm version"
  npm --version
  echo "Starting gateway ..."
  node ./index.js
}

mkdir -p "${PIXELWALL_HOME}/log"
run_app > "${PIXELWALL_HOME}/log/run-app.log" 2>&1
