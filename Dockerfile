FROM node:20-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 5300

ENV PORT=5300

CMD ["pnpm", "start"]




