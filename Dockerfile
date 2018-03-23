FROM node:latest

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock /app

RUN set -ex; \
  if [ '$NODE_ENV' = 'production' ]; then \
  yarn install --no-cache --frozen-lockfile --production && yarn cache clean; \
  elif [ '$NODE_ENV' = 'test' ]; then \
  touch yarn-error.log; \
  mkdir -m 777 build; \
  yarn install --no-cache --frozen-lockfile; \
  chown -R node:node node_modules package.json yarn.lock yarn-error.log; \
  else \
  touch yarn-error.log; \
  mkdir -p -m 777 node_modules /home/node/.cache/yarn; \
  chown -R node:node node_modules package.json yarn.lock yarn-error.log /home/node/.cache/yarn; \
  fi;
  
# Bundle app source
COPY . /app

EXPOSE 3000

# Run the container under "node" user by default
USER node

CMD ['yarn', 'dev']
