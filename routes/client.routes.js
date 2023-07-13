const Router = require("koa-router");
const clientController = require("../controllers/client.controller");

const router = new Router();

router.get("/", clientController.getAllClients);

router.get("/:id", clientController.getClientById);

router.post("/", clientController.addClient);

router.put("/:id", clientController.updateClient);

router.delete("/:id", clientController.deleteClient);

router.post("/login", clientController.loginClient);

module.exports = router.routes();
