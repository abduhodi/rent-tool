const Router = require("koa-router");
const districtController = require("../controllers/district.controller");

const router = new Router();

router.get("/", districtController.getAllDistricts);

router.get("/:id", districtController.getDistrictById);

router.post("/", districtController.addDistrict);

router.put("/:id", districtController.updateDistrict);

router.delete("/:id", districtController.deleteDistrict);

module.exports = router.routes();
