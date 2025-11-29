FROM nginx:alpine

# Poistetaan oletus nginx-konfiguraatio
RUN rm /etc/nginx/conf.d/default.conf

# Kopioidaan oma nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopioidaan frontendin staattiset tiedostot
COPY . /usr/share/nginx/html

EXPOSE 80