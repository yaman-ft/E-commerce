const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, adminOnly } = require('../middleware/auth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/', authenticate, adminOnly, productController.createProduct);
router.put('/:id', authenticate, adminOnly, productController.updateProduct);
router.delete('/:id', authenticate, adminOnly, productController.deleteProduct);

module.exports = router;
