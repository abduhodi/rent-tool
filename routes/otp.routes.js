const Router = require("koa-router");
const otpController = require("../controllers/otp.controller");

const router = new Router();

router.get("/", otpController.getAllOTPs);

router.get("/:id", otpController.getOTPById);

router.post("/", otpController.addOTP);

router.put("/:id", otpController.updateOTP);

router.delete("/:id", otpController.deleteOTP);

module.exports = router.routes();
