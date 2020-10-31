var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 res.render('touch', {
       title : 'Touch INterface', 
       layout : 'touch.pug'
});
});



module.exports = router;