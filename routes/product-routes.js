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
 *       SellerStoreID:
 *         type: string
 *       sellerStoreName:
 *         type: string
 *       productDescription:
 *         type: string
 *       productCategoryID:
 *         type: string
 *       price:
 *         type: integer
 *       currency:
 *         type: string
 *       discountPrice:
 *         type: integer
 *       productDetails:
 *         type: array
 *         items:
 *             type: object
 *             properties:
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
* /api/v1/product/list:
*   get:
*     tags:
*       - product-controller
*     description: Get Product List
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