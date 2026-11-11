#!/usr/bin/env bash
# Build the static site and publish it to the gh-pages branch.
# Usage: GH_TOKEN=... npm run deploy   (or just have `git push` credentials set up)
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build:pages
cd out
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-Genos0820}" -c user.email="${GIT_AUTHOR_EMAIL:-noreply@github.com}" commit -q -m "Deploy $(date -u +%FT%TZ)"
git push -f "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
