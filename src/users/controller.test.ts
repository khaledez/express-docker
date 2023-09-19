import { afterAll, beforeAll, describe, test } from "@jest/globals";
import express from "express";
import supertest from "supertest";
import { Container } from "typedi";
import { TestDBHandler } from "../database.js";
import UsersController from "./controller.js";

const dbHandler = TestDBHandler()
beforeAll(async () => {
	await dbHandler.init(true)
})
afterAll(async () => {
	await dbHandler.close()
})

const app = express()
app.use("/users", Container.get(UsersController).router)

describe("listing users", () => {

	test("when there is no users, return an empty list", async () => {
		const res = await supertest(app).get("/users");
		console.log(res.statusCode)
	})
})