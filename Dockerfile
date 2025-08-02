FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npx tsc

EXPOSE 3000

CMD ["node", "dist/backend/server.js"]


