const Router = require("koa-router");
const rentTypeController = require("../controllers/rent_type.controller");

const router = new Router();

router.get("/", rentTypeController.getAllRentTypes);

router.get("/:id", rentTypeController.getRentTypeById);

router.post("/", rentTypeController.addRentType);

router.put("/:id", rentTypeController.updateRentType);

router.delete("/:id", rentTypeController.deleteRentType);

module.exports = router.routes();
