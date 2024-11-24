FROM node:19.6-alpine

WORKDIR /user

COPY package*.json ./

RUN --mount=type=cache,target=/user/.npm \
    npm set cache /user/.npm && \
    npm ci

COPY . .    

RUN npx tsc

EXPOSE 5000

CMD [ "node", "dist/index.js" ]