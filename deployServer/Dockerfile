FROM node:18-alpine
WORKDIR /app

# 仅复制构建产物
COPY standalone ./
COPY static ./.next/static
COPY public ./public

EXPOSE 3000
CMD ["node", "server.js"]