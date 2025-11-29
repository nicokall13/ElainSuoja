FROM node:18-alpine
WORKDIR /app

COPY package.json .
RUN npm install

COPY . /usr/share/nginx/html

COPY . .

EXPOSE 4000
CMD ["npm", "start"]
