const Router = require("koa-router");
const categoryController = require("../controllers/category.controller");

const router = new Router();

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategoryById);

router.post("/", categoryController.addCategory);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router.routes();
