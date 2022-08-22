# FROM node:14.14.0-alpine

# WORKDIR /app

# COPY ./package.json ./

# RUN npm i

# COPY . .

# RUN npm start

FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]