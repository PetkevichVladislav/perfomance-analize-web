FROM node:18.17

WORKDIR ./

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD npm run start
