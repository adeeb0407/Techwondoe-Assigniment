FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8001 SECRET=TRa4sdYR21ES HOST=localhost USER=root PASSWORD=root DATABASE=techwondo

EXPOSE 8001

CMD ["npm", "start"]