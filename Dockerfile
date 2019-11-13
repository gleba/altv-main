# FROM alpine:3.7
FROM debian:10
WORKDIR /app
ADD . .
EXPOSE 7788
RUN ls
# RUN ./altv-server
# ENTRYPOINT ["./altv-server"] 
ENTRYPOINT ["sh", "./start.sh"] 