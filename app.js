const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

const port = process.env.PORT_APP || 5000;
const userRouter = require('./api/user/user.router');
const domisiliRouter = require('./api/domisili/domisili.router');
const kuesionerRouter = require('./api/kuesioner/kuesioner.router');
const kriteriaRouter = require('./api/kriteria/kriteria.router');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('success');
});
app.use('/user', userRouter);
app.use('/domisili', domisiliRouter);
app.use('/kuesioner', kuesionerRouter);
app.use('/kriteria', kriteriaRouter);
app.get('/photo/:filename', (req, res) => {
    return res.sendFile(process.cwd() + '/uploads/' + req.params.filename);
});

app.listen(port, () => {
    console.log(`app run at port ${port}`);
})