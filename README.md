# anpr-dashboard

_You need **Node** and **npm** installed on your machine._

## Installation

Clone this repository:

```shell
git clone https://github.com/teamdigitale/anpr-dashboard
cd anpr-dashboard/
```

Then install the Node dependencies, and build the assets:

```shell
npm i
npm run build
```

## Usage

You need a local web server to run the dashboard correctly.

You can use Python's built-in HTTP server:

```
# Python 2.x
python -m SimpleHTTPServer 3300

# Python 3.x
python -m http.server 3300
```

The go to http://localhost:3300 to see the dashboard.

**Data is loaded statically from `dashboardData.json`.**
