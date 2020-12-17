FROM node:12

#CREATE APP DIRECTORY
RUN mkdir -p /home/node/poller
WORKDIR /home/node/poller

#INSTALL DEPENDENCIES
COPY package*.json ./

RUN npm install

COPY . /home/node/poller

EXPOSE 3001

CMD [ "node", "app.js" ]
