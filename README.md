# SMARTY
E-learning portal to overcome the impacts of COVID-19 on the educational process
---
### Prerequisites
> 1. Install `nodejs`. Use this [installation guide](https://nodejs.org/en/download/package-manager/) according to your OS

> 2. Install `MongoDB`. Use this (https://www.mongodb.com/try/download/community)

---
## Front-End 
### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### Configuring env. variables
The project contains `.env` as a fallback, `.env.development` for `NODE_ENV=development` and `.env.production` for `NODE_ENV=production`. All of them has the following env vars :-
    
1. `VUE_APP_API_HOST` : Host of the REST API to use.
2. `VUE_APP_API_PORT` : Port of the REST API on that host.

---
## Back-End

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
node app.js
```
