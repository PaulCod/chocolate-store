FROM node:latest

WORKDIR /app

COPY jest.config.ts tsconfig.json ./
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

EXPOSE 3838

CMD pnpm start
