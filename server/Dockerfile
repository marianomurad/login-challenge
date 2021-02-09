
FROM node:14-alpine

RUN mkdir -p /opt/app/server

WORKDIR /opt/app/server

COPY package.json .

RUN yarn install --quiet
RUN yarn global add nodemon --quiet

# Copying everything into the container
COPY . .

EXPOSE 3001

CMD ["yarn", "start"]
