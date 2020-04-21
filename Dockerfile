# WARNING: This image is meant to be used for development.
# Consider using a web server such as nginx to server the
# content in production.

# Variables definition
ARG NODE_VERSION=12.6-alpine

# Get development image
FROM node:${NODE_VERSION}

# Environment variables definition
ENV USER=anpr
ENV HOME=/usr/src/app

# Temporarily set user to root
USER root

# Set the work directory
WORKDIR ${HOME}

# Install the Gulp CLI
RUN npm install gulp-cli -g

# Copy files
COPY css css
COPY fonts fonts
COPY img img
COPY webfonts webfonts
COPY anpr_zone.geojson .
COPY dashboardData.json .
COPY dashboardDataFormatted.json .
COPY favicon.png .
COPY gulpfile.js .
COPY helper.js .
COPY index.html .
COPY index.js .
COPY localization.js .
COPY package-lock.json .
COPY package.json .
COPY previsioni.json .

# Run as unprivileged user
RUN adduser --home ${HOME} --shell /bin/sh --disabled-password ${USER}

# Set user ownership on workdir and subdirectories
RUN chown -R ${USER}.${USER} ${HOME}

# Set running user
USER ${USER}

# Install dependencies
RUN npm install

# Set port and entrypoint
EXPOSE 8080
CMD ["npm", "start"]
