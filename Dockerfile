FROM node:18-alpine AS builder
WORKDIR /home/app
COPY . ./
RUN yarn
ENV NODE_ENV=production
RUN yarn build

FROM node:18-alpine
WORKDIR /home/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn --prod
COPY --from=builder /home/app/dist dist/
EXPOSE 3030
CMD ["yarn", "start"]
