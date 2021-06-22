# (OLD) ANPR Dashboard (stato-migrazione)

⚠️  This is the old dashboard and it's not developed anymore ⚠️

The ANPR dashboard is a static, web application that reads data from two local json files ([dashboardData.json](dashboardData.json) and [previsioni.json](previsioni.json)) and represents them in form of charts in a web page.

## Requirements

The assets produced by the builds can run on any web server able to serve static content (html, js and css files).

To build and minify the source files, thus making them ready for being deployed, or to run a local development server, you'll need the following tools:

* [NodeJs](https://nodejs.org/) - any version should be fine, although at the moment of the writing we're using 11.10. This is needed by NPM (below)

* [Node Package Manager (NPM)](https://www.npmjs.com/get-npm). This is the package manager used to install dependencies

## Build and minify for deployments

To build and minify the source code, thus making it ready for deployments (final artifact can be copied as is to a web server), simply run:

```shell
# Install dependencies
npm install

# Build and minify
npm run build
```

You should find the new minified assets in the *docs* folder of this repository.

The dashboard website is currently deployed through [GitHub pages](https://github.com/teamdigitale/anpr-dashboard), which automatically "renders" the files in the *docs* directory (produced by the build process described above).

## Run and test the application locally

For development purposes the project can also be run locally, directly on the developer machine, or in form of a Docker container. Following, both procedures are explained.

### Run the project directly on the local machine

```shell
# Install dependencies
npm install

# Build the assets and minify with gulp.
# Then, start the local development server
npm start
```

You should now be able to see the dashboard opening a browser and pointing it to `http://localhost:8080`.

### Run the project as a Docker container

A `Dockerfile` and a `docker-compose.yaml` files are in the root of this repository.

Bring up the development environment in form of container, running:

```shell
docker-compose up [-d] [--build]
```

where:

* *-d* executes the container in background

* *--build* forces the container to re-build

The website should now be accessible on port *8080*.

To bring down the test environment and remove the containers use

```shell
docker-compose down
```

## Update data sources and automation

The application makes use of two local data sources ([dashboardData.json](dashboardData.json) and [previsioni.json](previsioni.json)), located in the root of the repository. The two files already present in the repository should reflect the last ones uploaded, that the website is showing to users. In order to show new data, you'll need to change the files in the root directory, run the build once again, and push to GitHub the changes.

The process is fully automated through [CircleCI](https://circleci.com), which every hour runs a [custom pipeline](.circleci/config.yml) that:

* Downloads the latest files (if not found, it keeps the local ones)

* Builds the assets and minifies

* Pushes the changes to the GitHub repository

## How to contribute

Contributions are welcome! Feel free to open issues and submit a pull request at any time.

## License

Copyright (c) 2019 Presidenza del Consiglio dei Ministri

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
