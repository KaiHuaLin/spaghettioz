# Backend

### Intallation

Make sure you already cloned the repo and having **nodejs**  and **npm**

First, use `npm install` to install the needed dependencies for the app.
```sh
$ cd spaghettioz
$ cd back-end
$ npm install
```

Next, we copy the `.sample-env` file to `.env` file by doing 
```sh
$ cp .sample-env .env
```

Next we use `vim .env` or edit `.env` in the code editor to setup environment variable
we assign each environment variable to the given value.
Or just copy the given `.env` content and paste to the `.env` file

Next, let's install nodemon to run the server
```sh
$ npm install -g nodemon`
```

Next, we run the server using nodemon
```sh
$ nodemon
//or
$ nodemon server.js
```

And finally, you should see this on your terminal:
`listening on localhost: 8080`

And that is all.