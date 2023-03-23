FROM node:18-alpine

EXPOSE 3000

WORKDIR /var/app
RUN npm i -g pnpm
COPY package* .
RUN pnpm i
COPY src ./src
CMD pnpm dev
