const Router = require("koa-router");
const toolController = require("../controllers/tool.controller");

const router = new Router();

router.get("/", toolController.getAllTools);

router.get("/:id", toolController.getToolById);

router.post("/", toolController.addTool);

router.put("/:id", toolController.updateTool);

router.delete("/:id", toolController.deleteTool);

module.exports = router.routes();
