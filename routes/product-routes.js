/**
 * @swagger
 * securityDefinitions:
 *      bearerAuth:
 *          type: apiKey
 *          schema: bearer
 *          name: Authorization
 *          bearerFormat: JWT
 *          in: "header"
 * security:
 *        - bearerAuth: []
 */




/**
 * @swagger
 * definition:
 *   ProductDetails:
 *     properties:
 *       productTitle:
 *         type: string
 *       productSKU:
 *         type: string
 *       productDescription:
 *         type: string
 *       productCategoryID:
 *         type: string
 *       price:
 *         type: integer
 *       currency:
 *         type: string
 *       allowDiscount:
 *         type: boolean
 *         default: false
 *       discountPercentage:
 *         type: integer
 *       productDetails:
 *         type: array
 *         items:
 *             type: object
 *             properties:
 *                  quantity:
 *                      type: integer
 *                  sizes:
 *                      type: string
 *                  stockAvailability:
 *                      type: boolean
 *       productRating:
 *         type: integer
 *       OverallRating:
 *         type: integer 
 * 
 */




/**
 * @swagger
 * /api/v1/product/add:
 *   post:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - product-controller
 *     description: Add Product Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ProductDetails
 *         description: ProductDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ProductDetails'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */





/**
 * @swagger
 * definition:
 *   GetProductDetails:
 *     properties:
 *       page_no:
 *         type: integer
 *       no_record:
 *         type: integer
 *       rootCatId:
 *         type: string
 *       productCategoryID:
 *         type: string
 *       searchText:
 *         type: string
 *       productSort:
 *         type: integer
 */





/**
* @swagger
* /api/v1/product/list:
*   post:
 *     tags:
 *       - product-controller
 *     description: Get Product Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ProductDetails
 *         description: Get ProductDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/GetProductDetails'
*     responses:
*       200:
*         description: Successfully Fetched
*         content:
*            application/json:
*              schema:
*                type: object
*/  





/**
* @swagger
* /api/v1/product/single-product/{id}:
*   get:
*     tags:
*       - product-controller
*     description: Get Product by id
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: Product id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully Fetched
*         content:
*            application/json:
*              schema:
*                type: object
*/









/**
 * @swagger
 * definition:
 *   UpdateProductDetails:
 *     properties:
 *       productId:
 *         type: string
 *       productTitle:
 *         type: string
 *       productSKU:
 *         type: string
 *       SellerStoreID:
 *         type: string
 *       productDescription:
 *         type: string
 *       productCategoryID:
 *         type: string
 *       price:
 *         type: integer
 *       currency:
 *         type: string
 *       productDetails:
 *         type: array
 *         items:
 *             type: object
 *             properties:
 *                  quantity:
 *                      type: integer
 *                  sizes:
 *                      type: string
 *                  stockAvailability:
 *                      type: boolean
 *       productRating:
 *         type: integer
 *       OverallRating:
 *         type: integer 
 * 
 */




/**
 * @swagger
 * /api/v1/product/update:
 *   put:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - product-controller
 *     description: Update Product Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ProductDetails
 *         description: ProductDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/UpdateProductDetails'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */






/**
 * @swagger
 * definition:
 *   FeaturedProduct:
 *     properties:
 *       productId:
 *         type: string
 *       featuredProduct:
 *         type: boolean
 *         default: false
 */




/**
 * @swagger
 * /api/v1/product/add/featured-product:
 *   post:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - featured-product-controller
 *     description: Add Featured Product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ProductDetails
 *         description: ProductDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/FeaturedProduct'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */






/**
* @swagger
* /api/v1/product/featured-product/list:
*   get:
*     tags:
*       - featured-product-controller
*     description: Get Featured Product
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Successfully Fetched
*         content:
*            application/json:
*              schema:
*                type: object
*/

/**
* @swagger
* /api/v1/product/latest-arrival/list:
*   get:
*     tags:
*       - product-controller
*     description: Get Latest Products
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Successfully Fetched
*         content:
*            application/json:
*              schema:
*                type: object
*/






/**
* @swagger
* /api/v1/product/delete/{productId}:
*   put:
*     security:
*       - bearerAuth: []  
*     tags:
*       - product-controller
*     description: Delte Product by productId
*     produces:
*       - application/json
*     parameters:
*       - name: productId
*         description: Product id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully Deleted
*         content:
*            application/json:
*              schema:
*                type: object
*/