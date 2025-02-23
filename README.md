# Log Monitoring REST API

## Overview
This service provides a REST API to retrieve logs from `/var/log` on a Unix-based machine.

## Installation
1. cd log-monitor

2. Install dependencies:
npm install

3. Start the server:
node server.js

## Usage
### Endpoint: get `/logs`
#### Parameters:
- `file`: The log filename (e.g., `syslog.log`, `auth.log`).
- `keyword` (optional): Filter results based on a keyword.
- `limit` (optional): Number of results to return.

#### Example Requests:
- Get the last 100 lines from syslog:
GET http://localhost:3000/logs?file=syslog&limit=100

- Get logs containing the word "error":
GET http://localhost:3000/logs?file=syslog&keyword=error

## UI
There is a VERY simple UI you can open up and use to request the logs if you'd rather not use cULR or Postman

basicLogUI.html


## Extra
There is a logGenerator.js you can use to generate some random log files if needed.

node logGenerator.js <sizeInMB> <fileName>

node .\logGenerator.js 50 50mbfile.log
