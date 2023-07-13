const Router = require("koa-router");
const priceController = require("../controllers/price.controller");

const router = new Router();

router.get("/", priceController.getAllPrices);

router.get("/:id", priceController.getPriceById);

router.post("/", priceController.addPrice);

router.put("/:id", priceController.updatePrice);

router.delete("/:id", priceController.deletePrice);

module.exports = router.routes();
