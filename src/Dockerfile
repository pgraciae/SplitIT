FROM node:10.19.0

# set working directory
RUN mkdir /usr/src/src
WORKDIR /usr/src/src

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/src/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json /usr/src/package.json
COPY public /usr/src/public
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
WORKDIR /usr/src
RUN ls

# start app
CMD ["npm", "start"]