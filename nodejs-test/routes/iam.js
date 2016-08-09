var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  console.log("**********************************************************************************");
  console.log("\n\n\n");
  console.log(req.query);
  console.log("\n\n\n");
  console.log("**********************************************************************************");

  res.send('Ответ принят');
});

module.exports = router;
