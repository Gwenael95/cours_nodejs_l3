import express from 'express'
import { homeController, formController } from './controllers'

const mw_test = (req, res, next) => {
	console.log("")
	next()
}

const router= express.Router()

router.get("/home", homeController)
router.post("/form", mw_test, formController)

export default router // module.exports

