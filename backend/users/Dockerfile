FROM node:12
WORKDIR /usr/src/users
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["node", "index.js"]