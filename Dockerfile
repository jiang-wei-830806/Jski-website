# 用 slim（glibc）而非 alpine（musl）：better-sqlite3 只为 glibc 提供预编译二进制，
# alpine 会回退源码编译，需额外装 python3/make/g++ 且构建易失败
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
