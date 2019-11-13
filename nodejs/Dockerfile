FROM mhart/alpine-node:12
WORKDIR /root
COPY .env .
COPY package.json .
COPY tsconfig.json .
COPY server.api.js .
COPY server.guard.js .
COPY start.sh .
COPY dist ./dist
COPY src-guard ./src-guard
COPY src-api ./src-api
COPY src-shared ./src-shared
RUN mkdir data
RUN mkdir static
RUN cd static
RUN mkdir teleavatars

ENTRYPOINT ["npm", "run", "prod"]
EXPOSE 80
