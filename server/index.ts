import express from 'express';

const port = 5000;
const app = express();

const start = async () => {
    try {
        await new Promise(resolve => app.listen({port}, resolve));
    } catch (error) {
        console.log("error starting server", error )
    }
}

start();