const express = require("express");
const router = express.Router();
const axios = require("axios")
const get = require("lodash.get")

const axiosClient = axios.create({
	timeout: 60000,
})
axiosClient.interceptors.request.use( x => {
	// to avoid overwriting if another interceptor
	// already defined the same object (meta)
	x.meta = x.meta || {}
	x.meta.requestStartedAt = new Date().getTime();
	return x;
})
axiosClient.interceptors.response.use( x => {
	x.responseTime = new Date().getTime() - x.config.meta.requestStartedAt;
	return x;
})



const testRequest = async (req, res) => {
return res.status(200).send("Running")
};
const getMethod = async (req, res) => {
	const {url} = get(req, "query")
	console.log(url);
	try {
		const request = await axiosClient.get(url)
		const body = request.data
		const status = request.status
		const statusText = request.statusText
		const headers = request.headers
		const responseTime = request.responseTime
		return res.status(200).send({"body": body, "status": status, "statusText": statusText, "headers": headers, "responseTimeInMs": responseTime})
	}catch (e) {
		res.status(500).send(e.message)
	}
};

const postMethod = async (req, res) => {
	const {url} = get(req, "query")
	console.log(url);
	console.log("REQ BODY", req.body);
	try {
		const request = await axiosClient.post(url, req.body)
		const body = request.data
		const status = request.status
		const statusText = request.statusText
		const headers = request.headers
		const responseTime = request.responseTime
		return res.status(200).send({"body": body, "status": status, "statusText": statusText, "headers": headers, "responseTimeInMs": responseTime})
	}catch (e) {
		res.status(500).send(e.message)
	}
};


router.get("/", testRequest);
router.get("/getMethod", getMethod);
router.post("/postMethod", postMethod)

module.exports = router;


