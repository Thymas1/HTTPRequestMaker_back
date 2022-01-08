const express = require("express");
var cors = require('cors')

const request = require("./routes/request");


const allowCORSMiddleware = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
	res.header(
		"Access-Control-Expose-Headers",
		"Content-Length, Content-Type, Content-Disposition"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Accept, Authorization, Content-Type, X-Requested-With, Range"
	);
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	} else {
		return next();
	}
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(allowCORSMiddleware);
app.use(cors())
app.use("/request", request);

module.exports = app;
