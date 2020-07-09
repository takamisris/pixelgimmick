FROM node:alpine3.10

# ENV
ENV NODE_ENV="development"

# set up work directory
WORKDIR /app

# setup
COPY ./app .
RUN npm install
