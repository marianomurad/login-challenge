
FROM node:14-alpine

RUN mkdir -p /opt/app/client

WORKDIR /opt/app/client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/client/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .

RUN yarn install --silent
RUN yarn global add react-scripts --silent

# add app
COPY . .
EXPOSE 3000

# start app
CMD ["yarn", "start"]
