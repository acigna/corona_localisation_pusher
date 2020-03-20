FROM crossbario/crossbar

USER root

RUN apt-get update

RUN apt-get install -y curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -

RUN apt-get -y install nodejs

RUN mkdir /home/corona_data_pusher/

WORKDIR /home/corona_data_pusher/

COPY package.json .

RUN npm install

COPY autobahn_config.json .

COPY elastic_config.json .

COPY elasticsearch.js .

COPY autobahn.js .

COPY data_pusher.js .

COPY config.json /node/.crossbar/
