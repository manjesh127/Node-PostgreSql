var express = require('express');
var router = express.Router();
const api = require('./controller')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/test', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/insert_user', api.insert)
router.post('/delete_user', api.delete)
router.post('/getall_user',api.getAlluser)
router.post('/getsingle_user',api.getSingleUser)
router.post('/update_user',api.updateUser)
module.exports = router;