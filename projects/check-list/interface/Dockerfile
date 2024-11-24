FROM node:19.6-alpine

WORKDIR /user

COPY package*.json ./

RUN --mount=type=cache,target=/user/.npm \
    npm set cache /user/.npm && \
    npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]