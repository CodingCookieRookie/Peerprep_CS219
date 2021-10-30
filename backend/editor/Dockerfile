FROM node:12
WORKDIR /usr/src/editor
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5003
CMD ["node", "index.js"]