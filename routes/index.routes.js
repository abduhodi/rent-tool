const Router = require("koa-router");

const router = new Router();

router.use("/admin", require("./admin.routes"));

router.use("/category", require("./category.routes"));

router.use("/client", require("./client.routes"));

router.use("/district", require("./district.routes"));

// router.use("/otp", require("./otp.routes"));

router.use("/owner", require("./owner.routes"));

router.use("/price", require("./price.routes"));

router.use("/rent-type", require("./rent_type.routes"));

router.use("/rent", require("./rent.routes"));

router.use("/session", require("./session.routes"));

router.use("/shop-tool", require("./shop_tool.routes"));

router.use("/shop", require("./shop.routes"));

router.use("/tool", require("./tool.routes"));

module.exports = router.routes();
