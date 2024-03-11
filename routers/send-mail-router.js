const sendMailRouter = require("../controllers/send-mail-controller");
const router = require("express").Router();

router.post("/", sendMailRouter.sendMail);


module.exports = router;
