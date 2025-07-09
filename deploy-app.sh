#!/data/data/com.termux/files/usr/bin/bash
pkg update -y
pkg upgrade -y
pkg install -y nodejs git openssh termux-api curl
read -p "Enter GITHUB_PAT: " GITHUB_PAT
read -p "Enter your GitHub Username (e.g., octocat): " GITHUB_USERNAME
FRONTEND_REPO="https://github.com/quartzquadrant8/my-github-app-repo.git"
BACKEND_REPO="https://github.com/quartzquadrant8/API.git"
FRONTEND_DIR="my-github-app-repo"
BACKEND_DIR="API"
if [ ! -d "$FRONTEND_DIR" ]; then
    git clone "$FRONTEND_REPO"
else
    cd "$FRONTEND_DIR"
    git pull origin main
    cd ..
fi
cd "$FRONTEND_DIR"
npm install
cd ..
if [ ! -d "$BACKEND_DIR" ]; then
    git clone "$BACKEND_REPO"
else
    cd "$BACKEND_DIR"
    git pull origin main
    cd ..
fi
cd "$BACKEND_DIR"
if [ ! -f .env ]; then
    echo "GITHUB_PAT=$GITHUB_PAT" > .env
    echo "GITHUB_USERNAME=$GITHUB_USERNAME" >> .env
else
    sed -i "s/^GITHUB_PAT=.*/GITHUB_PAT=$GITHUB_PAT/" .env
    sed -i "s/^GITHUB_USERNAME=.*/GITHUB_USERNAME=$GITHUB_USERNAME/" .env
fi
npm install
cd ..
cd "$FRONTEND_DIR"
npm run dev:all
