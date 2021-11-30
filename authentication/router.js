import express from 'express'
import { homeController, formController } from './controller.js'
import {
	deleteTodosController,
	getAllTodosController,
	getOneTodosController,
	patchTodosController,
	postTodosController,
	putTodosController
} from "./todos.controller.js";

const mw_test = (req, res, next) => {
	console.log("")
	next()
}

const router= express.Router()

router.get("/home", homeController)
router.post("/form", mw_test, formController)

router.get("/todos", getAllTodosController)
router.get("/todos/:id", getOneTodosController) // to get only one element
router.post("/todos", postTodosController)
router.patch("/todos", patchTodosController) // update partially resources
router.delete("/todos", deleteTodosController)
router.put("/todos", putTodosController) // replace resources

export default router // module.exports

