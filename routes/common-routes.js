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
 * /api/v1/logout:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - common-controller
 *     description: Logout current User 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */


/**
* @swagger
* definition:
*   ForgetPasswordObj:
*     properties:
*       emailId:
*         type: string
*       userOtp:
*         type: string
*/


/**
 * @swagger
 * /api/v1/user/forget-password:
 *   post:
 *     tags:
 *       - common-controller
 *     description: Forget User Password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ForgetPassword
 *         description: ForgetPassword object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ForgetPasswordObj'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */
