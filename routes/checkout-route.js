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
 *       amount:
 *         type: string
 *       currency:
 *         type: string
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