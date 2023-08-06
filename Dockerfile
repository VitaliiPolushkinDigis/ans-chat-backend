#build stage
#FROM node:16 AS build

#WORKDIR /usr/src/app

#COPY package*.json ./

#RUN npm install

#COPY . .

#RUN npm run build

#prod stage
#FROM node:16

#WORKDIR /usr/src/app

#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}

#COPY --from=build /usr/src/app/dist ./dist

#COPY package*.json ./

#RUN npm install --only=production

#RUN rm package*.json

#EXPOSE 3001

#CMD [ "node", "dist/main.js" ]


FROM node:16 as production

# Create app directory, this is in our container/in our image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3001
CMD [ "node", "dist/main.js" ]