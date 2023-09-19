import { plainToClass } from "class-transformer";
import express, { Request, Response, Router } from "express";
import { Inject, Service } from "typedi";
import { DataSource, Repository } from "typeorm";
import { User } from "./model.js";

@Service()
export default class UsersController {
	public readonly router: Router
	private repository: Repository<User>

	constructor(@Inject("DATASOURCE") private db: DataSource) {
		this.router = express.Router()
		this.repository = this.db.getRepository(User)

		this.router.get("/", this.findAll.bind(this))
		this.router.post("/", this.createUser.bind(this))
	}

	async findAll(req: Request, res: Response) {
		const users = await this.repository.find();

		res.json(users)
	}

	async createUser(req: Request, res: Response) {
		const newUser = plainToClass(User, req.body);
		const result = await this.repository.save(newUser);

		res.json(result)
	}
}
