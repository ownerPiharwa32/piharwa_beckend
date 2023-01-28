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
 *   ProductCartDetails:
 *     properties:
 *       productDetails:
 *         type: array
 *         items:
 *            type: object
 *            properties:
 *                  productId:
 *                      type: string
 *                  quantity:
 *                      type: integer
 *                  sizes:
 *                      type: string
 * 
 */


/**
 * @swagger
 * /api/v1/cart/add/details:
 *   post:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - cart-controller
 *     description: Add Product in cart Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ProductDetails
 *         description: ProductDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ProductCartDetails'
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
* /api/v1/cart/list:
*   get:
*     security:
*       - bearerAuth: []  
*     tags:
*       - cart-controller
*     description: Get cart Products
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
 * definition:
 *   UpdateProductCart:
 *     properties:
 *       cartId:
 *         type: string
 *       productId:
 *         type: string
 *       quantity:
 *         type: integer
 *       sizes:
 *         type: string
 * 
 */






/**
 * @swagger
 * /api/v1/cart/update/details:
 *   put:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - cart-controller
 *     description: Update Product cCrt
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ProductDetails
 *         description: ProductDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/UpdateProductCart'
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
 * /api/v1/cart/delete/details/{productId}:
 *   delete:
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - cart-controller
 *     description: delete Cart Product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productId
 *         description: delete Cart Product
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: delete Cart Product
 *         content:
 *            application/json:
 *                type: object
 */