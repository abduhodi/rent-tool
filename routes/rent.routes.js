const Router = require("koa-router");
const rentController = require("../controllers/rent.controller");

const router = new Router();

router.get("/", rentController.getAllRents);

router.get("/:id", rentController.getRentById);

router.post("/", rentController.addRent);

router.put("/:id", rentController.updateRent);

router.delete("/:id", rentController.deleteRent);

module.exports = router.routes();
