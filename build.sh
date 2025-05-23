COLOR_OFF="\033[0m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"

echo -e "\n~~~${GREEN}Building the dist directory${COLOR_OFF}~~~\n"
pnpm compile

echo -e "\n~~~${GREEN}Copying package.json, pnpm-lock.yaml to dist directory${COLOR_OFF}~~~\n"
cp -v ./package.json ./pnpm-lock.yaml ./dist
if [[ $? -ne 0 ]]; then
  echo -e "\n~~~${RED}Copying package.json & pnpm-lock.yaml to dist directory failed${COLOR_OFF}~~~\n"
  exit 1
fi

echo -e "\n~~~${GREEN}Changing directory to dist and installing production dependencies${COLOR_OFF}~~~\n"
cd ./dist
pnpm install --prod

echo -e "\n~~~${GREEN}¡¡¡ALL DONE!!!${COLOR_OFF}~~~\n"

