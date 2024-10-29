FROM node:18-alpine3.16
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["npm", "run", "start:dev"]
