FROM node:22

COPY package.json /app/package.json

WORKDIR /app

RUN npm install

ENTRYPOINT ["/usr/bin/bash", "-c"]

CMD [ "npm run dev" ]

# CMD [ "sleep 10000" ]