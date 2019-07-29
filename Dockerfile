FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY ./dist ./dist
COPY ./swagger ./swagger
COPY ./node_modules ./node_modules
RUN npm install bcrypt
EXPOSE 3000
CMD ["node", "dist/index.js"]
