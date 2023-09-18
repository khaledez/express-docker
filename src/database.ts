import { DataSource } from "typeorm";
import { User } from "./users/model.js";

async function initDB(host: string, database: string, username: string, password: string, port: string): Promise<DataSource> {
	const portInt = parseInt(port)
	const AppDataSource = new DataSource({
		type: "mysql",
		host,
		username,
		password,
		database,
		port: portInt,
		entities: [User]
	})

	await AppDataSource.initialize()

	AppDataSource.synchronize(false)

	return AppDataSource
}

const dbPromise = initDB(
	process.env.DB_HOST!,
	process.env.DB_NAME!,
	process.env.DB_USER!,
	process.env.DB_PASSWORD!,
	process.env.DB_PORT || "3306"
)

export default dbPromise
