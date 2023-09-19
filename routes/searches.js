/**
 * Route: /api/all
 */

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { searchAtAll, searchByCollection } = require("../controllers/search");

const router = Router();

router.get('/:searchCriteria', [validateJWT], searchAtAll)
router.get('/collection/:table/:searchCriteria', [validateJWT], searchByCollection)

module.exports = router;