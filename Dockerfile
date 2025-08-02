FROM node:20

WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript using globally installed tsc
RUN npx tsc || ./node_modules/.bin/tsc

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "dist/backend/server.js"]
