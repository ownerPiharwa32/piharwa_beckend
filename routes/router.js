const express = require('express')
const router = express.Router();

const upload = require('../config/multer-config');

const sellersController = require('../controllers/sellers-controller')
const productController = require('../controllers/product-controller')
const categoryController = require('../controllers/category-controller')
const uploadController = require('../controllers/upload-controller')
const buyersController = require('../controllers/buyer-controller')

const Auth = require('../middleware/auth');
const { roles } = require('../constants/constants');

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to Piharwa"
    })
})

router.post('/sellers/register', sellersController.sellersRegistration) 
router.post('/sellers/login', Auth.restrictTo(roles.admin, roles.sellers), sellersController.sellersLogin) 


router.post('/buyers/register', buyersController.buyersRegistration) 
router.post('/buyers/login',buyersController.buyersLogin) 



router.get('/category/list', categoryController.getCategoryDetails)
router.get('/product/list', productController.productListing)
router.get('/product/single-product/:id', productController.getSingleproduct)
    
router.use(Auth.VerifyToken);

router.get('/sellers/details', sellersController.sellerDetails) 

router.post('/category/add', categoryController.addCategoryDetails)
router.put('/category/update', categoryController.updateCategoryDetails)
router.post('/product/add', productController.addProductDetails)




router.post('/product/upload/images/:id', upload.uploadFile.array('image', 6), uploadController.uploadProductImgs);


module.exports = router;