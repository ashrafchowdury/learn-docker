# FROM: Specifies the base image for the container (Ubuntu in this case)
FROM ubuntu 

# RUN: any commoand you would like to run 
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

# COPY: Copies necessary files into the container
# COPY: 1. source 2. destination
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY main.js main.js

RUN npm install -g pnpm && pnpm install

# ENTRYPOINT: Defines the command to be executed when the container starts
# ENTRYPOINT is used when you want to set the main process or command of the container that won't change.
ENTRYPOINT [ "node", "main.js" ]