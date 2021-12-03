import express from 'express';
import path from 'path';
import config from 'config';
import mongoose from 'mongoose';

import feedbackHandler from './routes/app.routes.js';
import authHandler from './routes/auth.routes.js';

const app = express();
const dirName = path.resolve();
const PORT = config.get('PORT') || 8888;

app.use(express.json({extended: true}));

app.use('/api/auth', authHandler);
app.use('/api', feedbackHandler);


/** For production */
if (process.env.NODE_ENV === 'production') {
    console.log('PRODUCTION');
    app.use('/', express.static(path.join(
        dirName, '/client/dist')
    ));

    app.use('*', (req, res) => {
        res.sendFile(path.join(
            dirName, '/client/dist/index.html'
        ));
    });
}

//Starting server
mongoose.connect(config.get('mongoURI'))
    .then(() => {
        app.listen(PORT, () => 
            console.log(`Server run on port ${PORT}...`)
        );
    })
    .catch(err => console.log('server doesn\'t start: ', err));
