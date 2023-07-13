const Router = require("koa-router");
const ownerController = require("../controllers/owner.controller");

const router = new Router();

router.get("/", ownerController.getAllOwners);

router.get("/:id", ownerController.getOwnerById);

router.post("/", ownerController.addOwner);

router.put("/:id", ownerController.updateOwner);

router.delete("/:id", ownerController.deleteOwner);

module.exports = router.routes();
