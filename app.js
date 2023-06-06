// require('dotenv/config')

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Logging = require('./library/Logging');
const productRouter = require('./routers/productsRouter');
const customerRouter = require('./routers/customerRouter');
const orderRouter = require('./routers/orderRouter');
const categoryRouter = require('./routers/categoryRouter');
const userRouter = require('./routers/userRouter');
const jwt = require('jsonwebtoken');
const dot = require('dotenv/config');
const app = express();
const port = 2100;
const api = process.env.API_URL

// middleware
app.use(bodyParser.json());
app.use(logger('tiny'))


//importing routes
// app.use(`${api}/products`,(req, res, next)=>{
// 	// const token = req.headers.authorization?.split(" ")[1]
// 	// if(!token){
// 	// 	return res.status(401).send({message:"UnAuthorized"})
// 	// }

// 	// 	try {
// 	// 		const decoded = jwt.verify(token, 'your-jwt-secret');
// 	// 	} catch (error) {
// 	// 		console.log(error)
// 	// 		console.log({message:"Expired Token"})
// 	// 		return res.status(401).send({message:"Expired Token"})
// 	// 	}
	
// 	// res.send({message:"hello your token has been verified"})
// }, productRouter);
app.use(`${api}/products`, productRouter);
app.use(`${api}/customers`, customerRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/users`, userRouter);

//connecting to the DB
mongoose.connect(process.env.MONGO_URL,{
	// useNewUrlParser:true,
	// useUnifiedTopology: true,
	dbName: "eshop"
})
	.then(() => {
		Logging.info('Connected to the database');
	}).catch((err) => {
		Logging.error('Unable to connect pls check your connection', err);
	});


app.listen(port,()=>{
	console.log(`Listening on https://localhost:${port}`);
})


