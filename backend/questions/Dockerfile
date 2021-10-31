FROM node:12
WORKDIR /usr/src/questions
COPY package*.json ./
RUN npm install
COPY index.js .
EXPOSE 5005
CMD ["node", "index.js"]