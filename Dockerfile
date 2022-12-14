FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
# VOLUME actions/ui/build:/usr/share/nginx/html
EXPOSE 80:80
