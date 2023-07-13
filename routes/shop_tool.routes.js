const Router = require("koa-router");
const shopToolController = require("../controllers/shop_tool.controller");

const router = new Router();

router.get("/", shopToolController.getAllShopTools);

router.get("/:id", shopToolController.getShopToolById);

router.post("/", shopToolController.addShopTool);

router.put("/:id", shopToolController.updateShopTool);

router.delete("/:id", shopToolController.deleteShopTool);

module.exports = router.routes();
