FROM node:20-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

ENV PORT=3000

CMD ["pnpm", "start"]




