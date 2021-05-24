

const express = require('@braitsch/express');

const app = express();

express.log('./logs');

express.http(app);

express.init(__dirname, app, 'convcoin', true);

express.start(app);