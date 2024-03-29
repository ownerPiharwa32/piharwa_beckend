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
 *   CheckoutDetails:
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
 *       amount:
 *         type: integer
 *       currency:
 *         type: string
 *       productDetails:
 *         type: array
 *         items:
 *            type: object
 *            properties:
 *               productID:
 *                  type: string
 *               quantity:   
 *                  type: integer
 *               sizes:
 *                  type: string
 * 
 */

/**
 * @swagger
 * /api/v1/checkout/order/create:
 *   post:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - checkout-controller
 *     description: Add Checkout Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: CheckoutDetails
 *         description: Checkout object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/CheckoutDetails'
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
 *   PaymentDetails:
 *     properties:
 *       razorpay_order_id:
 *         type: string
 *       razorpay_payment_id:
 *         type: string
 *       razorpay_signature:
 *         type: string
 * 
 */

/**
 * @swagger
 * /api/v1/checkout/payment/verify:
 *   post:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - checkout-controller
 *     description: Payment Verification
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: PaymentDetails
 *         description: ayment Verification
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/PaymentDetails'
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
*   BuyerOrderList:
*     properties:
*       pageNo:
*         type: integer
*       noRecord:
*         type: integer
*
*/


/**
 * @swagger
 * /api/v1/buyer/order/list:
 *   post:
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - checkout-controller
 *     description: Buyer Order List Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: BuyerDetails
 *         description: BuyerDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BuyerOrderList'
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
 * /api/v1/buyer/order/track-status/update/{orderId}/{status}:
 *   get:
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - checkout-controller
 *     description: Update Order Tracking Status
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: orderId
 *         description: Update Order Tracking Status
 *         in: path
 *         required: true
 *         type: string
 *       - name: status
 *         description: Update Order Tracking Status
 *         in: path
 *         required: true
 *         type: string
 *         enum: [initiated, packaging, shipped, delivered, canceled]
 *     responses:
 *       200:
 *         description: Update Order Tracking Status
 *         content:
 *            application/json:
 *                type: object
 */





/**
* @swagger
* definition:
*   DashboardOrderList:
*     properties:
*       pageNo:
*         type: integer
*       noRecord:
*         type: integer
*
*/


/**
 * @swagger
 * /api/v1/dashboard/orders/list:
 *   post:
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - checkout-controller
 *     description: All Order List Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: BuyerDetails
 *         description: All object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/DashboardOrderList'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 * 
 */






/**
* @swagger
* /api/v1/dashboard/order/details/{orderId}:
*   get:
*     security:
*       - bearerAuth: [] 
*     tags:
*       - checkout-controller
*     description: Get Order Details
*     produces:
*       - application/json
*     parameters:
*       - name: orderId
*         description: Order Details
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