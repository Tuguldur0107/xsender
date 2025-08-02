FROM node:20

WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

# Give execution permission to tsc binary
RUN chmod +x ./node_modules/.bin/tsc

# Build TypeScript using local tsc
RUN ./node_modules/.bin/tsc

EXPOSE 3000

CMD ["node", "dist/backend/server.js"]
