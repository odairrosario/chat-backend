FROM node:18

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn lint \
    && yarn prettier --check .

RUN yarn build

EXPOSE 9001

CMD ["node", "dist/main.js"]
