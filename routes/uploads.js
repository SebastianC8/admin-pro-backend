const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { fileUpload, getImage } = require("../controllers/upload");
const expressFileUpload = require('express-fileupload')

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', [validateJWT], fileUpload)
router.get('/:type/:imgID', getImage)

module.exports = router;