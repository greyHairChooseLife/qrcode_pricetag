require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

const homeRouter = require('./routers/homeRouter.js');
const adminRouter = require('./routers/adminRouter.js');
//const clientRouter = require('./routers/clientRouter.js');

app.use('/', homeRouter);
app.use('/admin', adminRouter);
//app.use('/client', clientRouter);

const port = 3000;
app.listen(port);
