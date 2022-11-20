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
*   SellerDetails:
*     properties:
*       firstName:
*         type: string
*       lastName:
*         type: string
*       mobileNo:
*         type: string
*       emailId:
*         type: string
*       password:
*         type: string
*       storeName:
*         type: string
*       storeAddress:
*         type: object
*         properties:
*           address_line_one:
*             type: string
*           address_line_two:
*             type: string
*           address_line_three:
*             type: string
*           city:
*             type: string
*           state:
*             type: string
*           country:
*             type: string
*           pincode:
*             type: string
*           loc:
*             type: object
*             properties:
*               type:
*                 type: string
*                 example: Point
*               coordinates:
*                 type: number
*                 example: [-75.182279, 39.969756]
*       gstNo:
*         type: string
*       panCardNo:
*         type: string
*/

/**
 * @swagger
 * /api/v1/sellers/register:
 *   post:
 *     tags:
 *       - seller-controller
 *     description: Create Seller Account Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: SellerDetails
 *         description: SellerDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/SellerDetails'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */





/**
 * @swagger
 * definition:
 *   LoginDetails:
 *     properties:
 *       emailId:
 *         type: string
 *       password:
 *         type: string
 */


/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - seller-controller
 *     description: Service Provider Login Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: LoginDetails
 *         description: LoginDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/LoginDetails'
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
* /api/v1/sellers/details:
*   get:
*     security:
*       - bearerAuth: []  
*     tags:
*       - seller-controller
*     description: Get Seller Details
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

