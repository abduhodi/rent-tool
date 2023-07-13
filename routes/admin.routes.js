const Router = require("koa-router");
const adminController = require("../controllers/admin.controller");

const router = new Router();

router.get("/", adminController.getAllAdmins);

router.get("/:id", adminController.getAdminById);

router.post("/", adminController.addAdmin);

router.put("/:id", adminController.updateAdmin);

router.delete("/:id", adminController.deleteAdmin);

module.exports = router.routes();
