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
* /api/v1/buyers/details:
*   get:
*     security:
*       - bearerAuth: []  
*     tags:
*       - buyer-controller
*     description: Get Buyer Details
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
*   BuyerListDetails:
*     properties:
*       pageNo:
*         type: integer
*       noRecord:
*         type: integer
*
*/


/**
 * @swagger
 * /api/v1/buyer/list/details:
 *   post:
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - buyer-controller
 *     description: List Buyer Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: BuyerDetails
 *         description: BuyerDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BuyerListDetails'
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
 *       username:
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






/**
 * @swagger
 * definition:
 *   BOTPLogin:
 *     properties:
 *       username:
 *         type: string
 *       otpToken:
 *         type: string
 */


/**
 * @swagger
 * /api/v1/buyers/verify/otp:
 *   post:
 *     tags:
 *       - buyer-controller
 *     description: Service Provider Login Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: BOTPLogin
 *         description: LoginDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BOTPLogin'
 *     responses:
 *       200:
 *         description: Successfully logged using Otp
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */










/**
* @swagger
* definition:
*   BuyerAddressDetails:
*     properties:
*       firstName:
*         type: string
*       lastName:
*         type: string
*       mobileNo:
*         type: string
*       address_line_one:
*         type: string
*       address_line_two:
*         type: string
*       landmark:
*         type: string
*       city:
*         type: string
*       state:
*         type: string
*       country:
*         type: string
*       pincode:
*         type: string
*
*/


/**
 * @swagger
 * /api/v1/buyer/add/address/details:
 *   post:
 *     security:
 *       - bearerAuth: [] 
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
 *           $ref: '#/definitions/BuyerAddressDetails'
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
* /api/v1/buyer/list/address/details:
*   get:
*     security:
*       - bearerAuth: []  
*     tags:
*       - buyer-controller
*     description: Get Buyer Address
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
* /api/v1/buyer/default/address/details:
*   get:
*     security:
*       - bearerAuth: []  
*     tags:
*       - buyer-controller
*     description: Get Buyer Address
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
*   BuyerUpdateAddressDetails:
*     properties:
*       addressId:
*         type: string
*       firstName:
*         type: string
*       lastName:
*         type: string
*       mobileNo:
*         type: string
*       default:
*         type: boolean
*       address_line_one:
*         type: string
*       address_line_two:
*         type: string
*       landmark:
*         type: string
*       city:
*         type: string
*       state:
*         type: string
*       country:
*         type: string
*       pincode:
*         type: string
*
*/



/**
* @swagger
* /api/v1/buyer/edit/address/details:
*   put:
*     security:
*       - bearerAuth: []  
*     tags:
*       - buyer-controller
*     description: Update Buyer Address
*     produces:
*       - application/json
*     parameters:
*       - name: buyerAddress
*         description: Update Buyer Address
*         in: body
*         schema:
*           type: object
*           $ref: '#/definitions/BuyerUpdateAddressDetails'
*     responses:
*       200:
*         description: Successfully Updated
*         content:
*            application/json:
*              schema:
*                type: object
*/



/**
 * @swagger
 * /api/v1/buyer/delete/address/details/{addressId}:
 *   delete:
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - buyer-controller
 *     description: delete buyer Address
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: addressId
 *         description: addressId of the buyer Address
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: addressId of the buyer Address
 *         content:
 *            application/json:
 *                type: object
 */