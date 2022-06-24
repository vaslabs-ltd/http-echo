FROM node:16-alpine3.15
COPY *.json /http-echo/
COPY *.ts /http-echo/
WORKDIR /http-echo
RUN npm install
ENTRYPOINT [ "npm", "run", "start" ]