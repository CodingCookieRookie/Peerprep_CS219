FROM node:12
WORKDIR /usr/src/chat
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5002
CMD ["node", "index.js"]