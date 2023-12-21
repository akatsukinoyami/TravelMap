FROM fholzer/nginx-brotli
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir /app
COPY ./public /app

EXPOSE 80
