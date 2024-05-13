const app = require('./src/app');
const ENV = require('./config/index');
const connectorInstance = require('./src/database/connector.database');

const APP = ENV.APP;
const server = app.listen(ENV.APP.PORT, () => {
    console.log('====================================');
    console.log(
        `...Listening on ${APP.PROTOCOL}://${APP.DOMAIN}:${APP.PORT}`
    );
    console.log('====================================');
});

/* Press Ctrl + C to close the server */
process.on('SIGINT', async () => {
    /* Close the database */
    await connectorInstance.disconnect();

    /* Close the server */
    server.close((error) => {
        if (error)
            console.log('Encouter problems from closing the server');

        console.log(
            `Closed the server on ${APP.PROTOCOL}://${APP.DOMAIN}:${APP.PORT}`
        );
    });
});
