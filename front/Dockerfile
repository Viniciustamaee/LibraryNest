FROM node:18.17.1

COPY . .

COPY ./ package*.json 

WORKDIR /usr/scr/app/front

RUN npm install -g npm@10.7.0

EXPOSE 8000

CMD [ "npm","start"]