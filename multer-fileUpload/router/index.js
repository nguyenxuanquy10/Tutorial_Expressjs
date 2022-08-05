const express = require('express'); //
const router = express.Router();
const upload = require('../util/multer');
const { documentController } = require('../controller/index');
router.get("", upload.single("myFile123"), documentController.home)

router.post("/api/uploadFile", upload.single("myFile"), documentController.getFile)
    // router.get("/api/uploadFile", documentController.getFile)


module.exports = router;