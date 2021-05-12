const express = require("express");
require("isomorphic-fetch");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const host = "https://pikachu.pub.shipit-climbcredit.com";

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
	const { params, query } = req;
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
			body: JSON.stringify({
				...req.body,
			}),
		});
		const jsData = await requestedData.json();
		res.json(jsData);
	} catch (err) {
		console.log(err);
		res.status(502).send(err);
	}
});

app.listen(port, () => console.log("server up and running"));
