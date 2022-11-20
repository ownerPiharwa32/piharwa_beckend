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
 *       productCategoryID:
 *         type: string
 *       searchText:
 *         type: string
 * 
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

