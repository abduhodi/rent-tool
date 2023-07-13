const Router = require("koa-router");
const shopController = require("../controllers/shop.controller");

const router = new Router();

router.get("/", shopController.getAllShops);

router.get("/:id", shopController.getShopById);

router.post("/", shopController.addShop);

router.put("/:id", shopController.updateShop);

router.delete("/:id", shopController.deleteShop);

module.exports = router.routes();
