const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Logger = require('./library/Logging');
const productRouter = require('./routes/productsRouter');
const customerRouter = require('./routes/customerRouter');
const orderRouter = require('./routes/orderRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');
const dot = require('dotenv/config');
const app = express();
const port = 2100;
const api = process.env.API_URL


app.use(bodyParser.json());
app.use(logger('tiny'))


app.use(`${api}/products`, productRouter);
app.use(`${api}/customers`, customerRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/users`, userRouter);


mongoose.connect(process.env.MONGO_URL,{
	// useNewUrlParser:true,
	// useUnifiedTopology: true,
	dbName: "eshop"
})
	.then(() => {
		Logger.info('Connected to the database');
	}).catch((err) => {
		Logger.error('Unable to connect pls check your connection', err);
	});


app.listen(port,()=>{
	Logger.info(`Listening on https://localhost:${port}`);
})


