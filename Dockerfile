## version - 1

# # FROM: Specifies the base image for the container (Ubuntu in this case)
# FROM ubuntu 

# # RUN: any commoand you would like to run 
# RUN apt-get update
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get upgrade -y
# RUN apt-get install -y nodejs
# RUN npm install -g pnpm

# # COPY: Copies necessary files into the container
# # COPY: 1. source 2. destination
# COPY package.json package.json
# COPY pnpm-lock.yaml pnpm-lock.yaml
# COPY index.js index.js

# RUN pnpm install

# # ENTRYPOINT: Defines the command to be executed when the container starts
# # ENTRYPOINT is used when you want to set the main process or command of the container that won't change.
# ENTRYPOINT [ "node", "index.js" ]


## version - 2

FROM node:19.6-alpine 

WORKDIR /user/src/app

ENV NODE_ENV production

COPY package*.json ./

RUN --mount=type=cache,target=/user/src/app/.npm \
    npm set cache /user/src/app/.npm && \
    npm ci --only=production  

USER node

COPY --chown=node:node . .

EXPOSE 8000

CMD [ "node", "index.js" ]

### Efficiancy progress we made
# REPOSITORY    TAG     IMAGE ID       CREATED             SIZE
# node-app      7       23f5e7545001   30 minutes ago      178MB
# node-app      6       1f5c7ec7cf2d   36 minutes ago      181MB
# node-app      5       7ec2a5250eed   44 minutes ago      181MB
# node-app      4       0cfc5e7acb6d   50 minutes ago      183MB
# node-app      3       67a5b969df59   52 minutes ago      183MB
# node-app      2       d3c0c6d003ca   55 minutes ago      183MB
# node-app      1       8c432a917092   59 minutes ago      183MB
# node-app      0       7ca0c22db736   About an hour ago   972MB