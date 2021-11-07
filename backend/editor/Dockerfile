FROM node:12
WORKDIR /usr/src/editor
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5004
CMD ["node", "index.js"]