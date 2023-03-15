FROM node:18

WORKDIR /app
COPY ./ /app/

RUN rm -rf /app/node_modules
RUN npm install

CMD ["npm", "start"]