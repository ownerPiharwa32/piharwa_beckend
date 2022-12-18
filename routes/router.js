const express = require('express')
const router = express.Router();

const upload = require('../config/multer-config');

const sellersController = require('../controllers/sellers-controller')
const productController = require('../controllers/product-controller')
const categoryController = require('../controllers/category-controller')
const uploadController = require('../controllers/upload-controller')
const buyersController = require('../controllers/buyer-controller')
const commonController = require('../controllers/common-controller')
const cartController = require('../controllers/cart-controller')

const Auth = require('../middleware/auth');
const { roles } = require('../constants/constants');

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to Piharwa"
    })
})

router.post('/sellers/register', sellersController.sellersRegistration)
router.post('/user/login', sellersController.sellersLogin)


router.post('/buyers/register', buyersController.buyersRegistration)
router.post('/buyers/login', buyersController.buyersLogin)
router.post('/buyers/verify/otp', buyersController.verifyOTP)


router.get('/category/list', categoryController.getCategoryDetails)
router.post('/product/list', productController.productListing)
router.get('/product/single-product/:id', productController.getSingleproduct)
router.get('/product/featured-product/list', productController.getFeaturedProduct)

router.use(Auth.VerifyToken);

router.get('/sellers/details', sellersController.sellerDetails)

router.post('/category/add', Auth.restrictTo(roles.admin), categoryController.addCategoryDetails)
router.put('/category/update', Auth.restrictTo(roles.admin), categoryController.updateCategoryDetails)
router.post('/product/add', Auth.restrictTo(roles.sellers), productController.addProductDetails)
router.put('/product/update', Auth.restrictTo(roles.sellers), productController.updateProductDetails)
router.put('/product/delete/:productId', Auth.restrictTo(roles.sellers, roles.admin), productController.deleteProduct)

router.post('/product/upload/images/:productId/:default', upload.uploadFile.array('image', 6), uploadController.uploadProductImgs);
router.post('/product/remove/images/:productId/:productImgId', uploadController.removeProductImgs);

router.post('/product/add/featured-product', Auth.restrictTo(roles.admin), productController.addFeaturedProduct)

/************************* Seller Api's *******************************/

router.get('/seller/product/list', sellersController.sellerProductsList)

/************************* common Api's *******************************/

router.post('/user/forget-password', commonController.forgetPassword)

/************************* cart Api's *******************************/

router.post('/cart/add/details', cartController.addProductInCart)
router.get('/cart/list', cartController.cartListing)


/************************* Buyer Api's *******************************/

router.post('/buyer/add/address/details', buyersController.addAddreesDetails)
router.put('/buyer/edit/address/details', buyersController.editAddreesDetails)
router.get('/buyer/list/address/details', buyersController.getAddreesDetails)
router.delete('/buyer/delete/address/details/:addressId', buyersController.deleteAddreesDetails)

module.exports = router;