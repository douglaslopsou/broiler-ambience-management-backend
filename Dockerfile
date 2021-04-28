FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g npm@7.11.1

COPY . ./

EXPOSE 3333

CMD ["npm" , "run" , "dev"]