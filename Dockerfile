FROM unocha/alpine-nodejs:6

ENV NPM_CONFIG_SPIN=false \
    NPM_CONFIG_PROGRESS=false

COPY . /srv/www
#inherited
WORKDIR /srv/www

RUN npm install && \
    npm run build && \
    npm cache clean
