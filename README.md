<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## About The Site Reliability App

```
This Nest.js server is in charge of listing and scraping site reliability data from WHOIS and VirusTotal

Setup:
1.Pull the app from the master branch of this repo
2.Make sure you have MongoDB installed locally and running on port 27017:
https://www.mongodb.com/try/download/community
3.Open the project's root via Vscode/terminal 
4.run -> npm install
5.Add the env file I provided to the projects root (won't run without it, .env)
6.run -> npm run start/start:dev

you should be good to go.

Important:
The schdueling interval is set on a file named scan.task.ts -> it is currently set to run every month,can be configured to basically everything,just change the cronExpression to w/e you like. 
if you can't find it,ctrl+f -> @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT) 

Documentation (Swagger): 
http://localhost:3000/api

There are two relevant user endpoints on this server:
1. GET http://localhost:3000/search/get-domain-data?url=www.cnn.com

This route returns data for an existing record inside the mongodb, if there's no existing record it will add it to the queue list and it will be added to the db on the next interval
Returns the data object or a message explaining to wait for the next cycle to run as requested

it takes one query parameter: url - string.


2. POST http://localhost:3000/search/insert-to-list

Body:
{
    "url":"www.cnn.com"
}

This route inserts a specific url to the queue list in order for it to be scanned on the next interval.
Will return a message regarding an invalid url or regarding a member that already exists on the list.


3. GET http://localhost:3000/search/start-task

This route is in use by the Cron mechanism,it is being called per the interval and collects the relevant data from the relevant members of the list,also updates the status of thus members in order to keep track on the status and update date.


---POSSIBLE ARCHITECHTURE:
This app should potentially run on Kubernetes pod or EC2 (which is the lesser option), if you wish to take the cron job outside of the pod itself you can use a lambda for the requests made for the schdueling, the mongoDB can run and be used via aws document db which is a very stable solution for that kind of data.
Since this is both an API and a schdueled service, I belive the Kubernetes approach will be more beneficial, since it can provide logging via aws cloudwatch with the right implementation (Logz.io can work too though).
For authentication I would use firebase if possible.
```
