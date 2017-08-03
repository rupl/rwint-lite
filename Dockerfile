FROM unocha/alpine-nodejs:6

ENV NPM_CONFIG_SPIN=false \
    NPM_CONFIG_PROGRESS=false \
    HOME=/srv/www

WORKDIR /srv/www

COPY . .

RUN npm install && \
    npm run build && \
    npm cache clean && \
    rm -rf /tmp/* && \
    cp docker/run_node /etc/services.d/node/run
