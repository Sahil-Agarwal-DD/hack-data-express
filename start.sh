#!/bin/sh

# it means use node version spacified inside .nvmrc, you need to install nvm, this keeps package-lock.json file clean
nvm use

cd service
npm i
npm run dev &

cd ..
cd ui-app
npm i
npm run start

