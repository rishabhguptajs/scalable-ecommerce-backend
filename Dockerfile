FROM node:18.17.1-alpine3.17
WORKDIR /src
ADD package*.json ./
RUN npm install --production
COPY . .
ENV NODE_ENV=production
CMD [ "node", "dist/index.js" ]