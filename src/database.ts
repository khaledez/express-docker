import { Container } from "typedi";
import { DataSource } from "typeorm";
import { User } from "./users/model.js";

export class DatabaseHandler {
	public readonly datasource: DataSource

	constructor(host: string, database: string, username: string, password: string, port: string) {
		const portInt = parseInt(port)
		this.datasource = new DataSource({
			type: "mysql",
			host,
			username,
			password,
			database,
			port: portInt,
			entities: [User]
		})
	}

	async init(inTest: boolean) {
		await this.datasource.initialize();
		await this.datasource.synchronize(inTest);
		console.log(`Database initialized. In test: ${inTest}`)
	}

	async close() {
		await this.datasource.destroy()
	}
}


export async function configureDB(): Promise<DatabaseHandler> {
	const dbHandler = new DatabaseHandler(process.env.DB_HOST!,
		process.env.DB_NAME!,
		process.env.DB_USER!,
		process.env.DB_PASSWORD!,
		process.env.DB_PORT || "3306")

	await dbHandler.init(false)

	Container.set("DATASOURCE", dbHandler.datasource)

	return dbHandler
}

export function TestDBHandler(): DatabaseHandler {
	const dbHandler = new DatabaseHandler(
		"localhost",
		"express-docker",
		"root",
		"very_secr3t",
		"3306"
	)
	Container.set("DATASOURCE", dbHandler.datasource)

	return dbHandler
}