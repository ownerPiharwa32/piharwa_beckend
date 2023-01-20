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
 *   TestimonialDetails:
 *     properties:
 *       fullname:
 *         type: string
 *       position:
 *         type: string
 *       rating:
 *         type: string
 *       description:
 *         type: string
 * 
 */


/**
 * @swagger
 * /api/v1/testimonials/add:
 *   post:
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - Testimonial-controller
 *     description: Create Testimonial Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: TestimonialDetails
 *         description: TestimonialDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/TestimonialDetails'
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
* /api/v1/testimonials/list:
*   get:
*     tags:
*       - Testimonial-controller
*     description: Get All Testimonial
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
 *   TestimonialObj:
 *     properties:
 *       testimonialId:
 *         type: string
 *       fullname:
 *         type: string
 *       position:
 *         type: string 
 *       rating: 
 *         type: string
 *       description:
 *         type: string     
 * 
 */


 /**
 * @swagger
 * /api/v1/testimonials/update:
 *   put:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - Testimonial-controller
 *     description: Update Testimonial Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Category
 *         description: update Testimonial details
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/TestimonialObj'
 *     responses:
 *       200:
 *         description: Successfully Updated
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */