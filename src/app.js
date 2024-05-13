'use strict';
const express = require('express');
const app = express();
const path = require('path');

/**
 * Middlewares
 */
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './')));

/**
 * CORS
 */
app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

/**
 * Routers
 */
const initRouters = require('./routers');
initRouters(app);

/**
 * Error handler [middleware]
 */
app.use((error, req, res, next) => {
    const status = error?.status || 500;
    const code = error?.code || status;
    const message = error?.message || 'Internal Server Error';
    return res.status(status).json({
        code,
        status,
        message,
    });
});

module.exports = app;
