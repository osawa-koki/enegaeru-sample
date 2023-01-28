FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN yarn

COPY . .

VOLUME [ "/app/dist" ]

CMD [ "yarn", "build" ]
