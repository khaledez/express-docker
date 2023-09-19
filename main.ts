import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { SignalConstants } from "node:os";
import process from "node:process";
import "reflect-metadata";
import { Container } from "typedi";
import { configureDB } from "./src/database.js";
import UsersController from "./src/users/controller.js";

const dbHandler = await configureDB()

const app = express();

app.use(express.json())
app.use(morgan("combined"));

app.get("/", (req, res) => {
	res.json({ msg: "Hello from express" })
})

app.use("/users", Container.get(UsersController).router)

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Starting A new server on port ${port}`)
})

async function handleShutdown(signal: SignalConstants) {
	console.log(`received ${signal}`)
	server.close()
	await dbHandler.close()
	process.exit(0)
}

process.on("SIGTERM", handleShutdown)
