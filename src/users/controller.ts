import { plainToClass } from "class-transformer";
import express, { Request } from "express";
import database from "../database.js";
import { User } from "./model.js";

const controller = express.Router();

controller.get("/", async (req, res) => {
	const repo = (await database).getRepository(User);
	res.json(await repo.find())
})

controller.post("/", async (req: Request, res) => {
	const repo = (await database).getRepository(User);
	const newUser = plainToClass(User, req.body)
	const result = await repo.save(newUser)
	res.json(result)
})

export const UsersController = controller