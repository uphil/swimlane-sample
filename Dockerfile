FROM diko316/alnode:v2.0

COPY . $PROJECT_ROOT

RUN apk add --no-cache openssl

CMD $APP_TOOLS/nginx/start.sh


