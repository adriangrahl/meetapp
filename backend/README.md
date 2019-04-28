## Backend

**Node:** https://nodejs.org/en/

npm i -g @adonisjs/cli

**Into project's backend folder**

Migrations (database schema) run **adonis migration:run**

Install dependencies with **npm install**

**Docker:** https://www.docker.com/get-started

Postgres database **docker run --name pggonode -p 5432:5432 -d -t kartoza/postgis**

Redis (mail async queue) **docker run --name redis -p 6379:6379 -d -t redis:alpine**

---

.**env example**

HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_NAME=AdonisJs
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=cEuqYloEDESzEJIuuvrACd1kIOtWmQNU

DB_CONNECTION=pg
DB_HOST=192.168.99.100 //-> docker pg container, remove this comment
DB_PORT=5432
DB_USER=docker
DB_PASSWORD=docker
DB_DATABASE=meetapp

MAIL_HOST=smtp.mailtrap.io //-> mailtrap given setup, remove this comment
MAIL_PORT=2525
MAIL_USERNAME=13228e249c2e18
MAIL_PASSWORD=b6b763cc670169

REDIS_HOST=192.168.99.100 //-> docker redis container, remove this comment
REDIS_PORT=6379

HASH_DRIVER=bcrypt

---

Tests **adonis test**

Run the backend server locally (terminal 1) **adonis serve --dev**

Run mail job (terminal 2) **adonis kue:listen**

for more details: https://adonisjs.com/

**P.S.**

This project uses mailtrap to emulate the mail handling.
Create a free fake inbox on https://mailtrap.io/ and set .env entries accordingly
