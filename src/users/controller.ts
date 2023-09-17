import { plainToClass } from "class-transformer";
import express, { Request } from "express";
import database from "../database.js";
import { User } from "./model.js";

const controller = express.Router();
const usersRepo = database.getRepository(User);

controller.get("/", async (req, res) => {
	res.json(await usersRepo.find())
})

controller.post("/", async (req: Request, res) => {
	const newUser = plainToClass(User, req.body)
	const result = await usersRepo.save(newUser)
	res.json(result)
})

export const UsersController = controller