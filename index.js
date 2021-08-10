const express = require("express");
require("isomorphic-fetch");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:3333" }));
app.use(express.json());

const host = fs.readFileSync("./BASE_URL.txt", "utf8", (err, data) => {
	if (err) throw err;
	return data;
});

if (!host) {
	const err = new Error("please add a valid BASE_URL");
	throw err;
	e;
}

app.get("/*", async (req, res) => {
	const { params, query, path } = req;
	const queryIsEmpty = Object.keys(query).length === 0;
	const querySlug =
		!queryIsEmpty &&
		Object.keys(query)
			.map((key) => `${key}=${query[key]}`)
			.join("&");
	const slug = params[0];
	const url = `${host}/${slug}${queryIsEmpty ? "" : `?${querySlug}`}`;

	try {
		const requestedData = await fetch(url);
		const jsData = await requestedData.json();
		res.json(jsData);
	} catch (err) {
		console.log(err);
		res.status(502).send(err);
	}
});

app.post("/*", async (req, res) => {
	const { params, query, body } = req;
	const queryIsEmpty = Object.keys(query).length === 0;
	const querySlug =
		!queryIsEmpty &&
		Object.keys(query)
			.map((key) => `${key}=${query[key]}`)
			.join("&");
	const slug = params[0];
	const url = `${host}/${slug}${queryIsEmpty ? "" : `?${querySlug}`}`;

	try {
		const requestedData = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(req.body),
		});
		const jsData = await requestedData.json();
		console.log(jsData, "data");
		res.json(jsData);
	} catch (err) {
		console.log("post err", err);
		res.status(502).send(err);
	}
});

app.patch("/*", async (req, res) => {
	const { params, query, body } = req;
	const queryIsEmpty = Object.keys(query).length === 0;
	const querySlug =
		!queryIsEmpty &&
		Object.keys(query)
			.map((key) => `${key}=${query[key]}`)
			.join("&");
	const slug = params[0];
	const url = `${host}/${slug}${queryIsEmpty ? "" : `?${querySlug}`}`;

	try {
		const requestedData = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(req.body),
		});
		const jsonData = await requestedData;
		const jsData = await jsonData.json();
		// console.log(jsData, "data");
		// console.log(requestedData, "res");
		res.status(requestedData.status).send(JSON.stringify(jsData));
	} catch (err) {
		console.log(err);
		res.status(502).send(err);
	}
});

app.put("/*", async (req, res) => {
	const { params, query, body } = req;
	const queryIsEmpty = Object.keys(query).length === 0;
	const querySlug =
		!queryIsEmpty &&
		Object.keys(query)
			.map((key) => `${key}=${query[key]}`)
			.join("&");
	const slug = params[0];
	const url = `${host}/${slug}${queryIsEmpty ? "" : `?${querySlug}`}`;

	try {
		const requestedData = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(req.body),
		});
		const jsonData = await requestedData;
		const jsData = await jsonData.json();
		// console.log(jsData, "data");
		// console.log(requestedData, "res");
		res.status(requestedData.status).send(JSON.stringify(jsData));
	} catch (err) {
		console.log(err);
		res.status(502).send(err);
	}
});

app.listen(port, () => console.log("server up and running"));
