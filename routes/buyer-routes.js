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
*   BuyerDetails:
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
*/


/**
 * @swagger
 * /api/v1/buyers/register:
 *   post:
 *     tags:
 *       - buyer-controller
 *     description: Create Buyer Account Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: BuyerDetails
 *         description: BuyerDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BuyerDetails'
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
 *   BLoginDetails:
 *     properties:
 *       emailId:
 *         type: string
 *       password:
 *         type: string
 */


/**
 * @swagger
 * /api/v1/buyers/login:
 *   post:
 *     tags:
 *       - buyer-controller
 *     description: Service Provider Login Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: BLoginDetails
 *         description: LoginDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BLoginDetails'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */
