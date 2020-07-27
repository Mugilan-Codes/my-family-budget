FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json .babelrc ./

RUN npm ci

COPY ./src ./src

EXPOSE 5000

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

CMD [ "npm", "run", "dev" ]