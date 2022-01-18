var express = require('express');
var router = express.Router();
var { create, update, remove, list } = require('../controller/productController')

//create product
router.post('/create', create);

router.get('/list', list);

router.put('/update/:id', update);

router.delete('/delete/:id', remove);

module.exports = router;
