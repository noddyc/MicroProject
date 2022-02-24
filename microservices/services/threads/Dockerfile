FROM node:12-alpine3.14

WORKDIR /app
COPY package.json /app
RUN npm ci --only=production && npm cache clean --force
COPY . /app

EXPOSE 3000
CMD node server.js