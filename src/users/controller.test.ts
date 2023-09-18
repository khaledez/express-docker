import { describe, expect, test } from "@jest/globals";
import express from "express";
import request from "supertest";
import { UsersController } from "./controller.js";

const app = express()
app.use("/users", UsersController)

describe("listing users", () => {
	test("when there is no users, return an empty list", async () => {
		const res = await request(app).get("/users");

		expect(res.statusCode).toBe(200)
	})
})