# FROM node:latest

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .



FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
# ENV PORT=8001 SECRET=TRa4sdYR21ES HOST=localhost USER=root PASSWORD=root DATABASE=techwondo
EXPOSE 8002
RUN npm i
CMD ["npm","run","dev"]