## Frontend

**Yarn package manager:** you can start by installing yarn at https://yarnpkg.com/en/docs/install

Run **yarn** command into the project's tree to install all dependencies

Run **yarn start**

**P.S.**

This project uses **reactotron** when dev env so that we can take a look at what's going on into the app (https://github.com/infinitered/reactotron)

This project doesn't use .env entries, so in order to use reactotron you have to:

access "frontend/src/config/reactotron.js"
change Reactotron.configure({ host: 'YOUR LOCAL IP' })
