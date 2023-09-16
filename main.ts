import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.json({ msg: "Hello from express" })
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Starting A new server on port ${port}`)
})

process.on("SIGHUP", () => {
	server.close()
})
