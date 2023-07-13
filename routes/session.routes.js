const Router = require("koa-router");
const sessionController = require("../controllers/session.controller");

const router = new Router();

router.get("/", sessionController.getAllSessions);

router.get("/:id", sessionController.getSessionById);

router.post("/", sessionController.addSession);

router.put("/:id", sessionController.updateSession);

router.delete("/:id", sessionController.deleteSession);

module.exports = router.routes();
