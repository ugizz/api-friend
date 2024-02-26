FROM node:21

ARG RDS_USERNAME \
    RDS_TYPE \
    RDS_RORT \
    RDS_PASSWORD \
    RDS_HOSTNAME \
    RDS_DB_NAME \
    JWT_SECRET \
    JWT_EXPIRE \
    FRIENDHOST  \
    AUTHHOST 

ENV RDS_USERNAME=${RDS_USERNAME} \
    RDS_TYPE=${RDS_TYPE} \
    RDS_RORT=${RDS_RORT} \
    RDS_PASSWORD=${RDS_PASSWORD} \
    RDS_HOSTNAME=${RDS_HOSTNAME} \
    RDS_DB_NAME=${RDS_DB_NAME} \
    JWT_SECRET=${JWT_SECRET} \
    JWT_EXPIRE=${JWT_EXPIRE} \
    FRIENDHOST=${FRIENDHOST} \
    AUTHHOST=${AUTHHOST}

RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .

RUN rm yarn.lock || true
RUN rm package-lock.json || true
RUN npm install 
RUN npm run build 

ENV HOST 0.0.0.0
EXPOSE 8102
CMD [ "node", "dist/main.js" ]