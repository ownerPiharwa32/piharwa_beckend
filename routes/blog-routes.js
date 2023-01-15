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
*   BlogDetails:
*     properties:
*       blogTitle:
*         type: string
*       featured_img:
*         type: string
*       featured_content:
*         type: string
*       blogDescription:
*         type: string
*
*/


/**
 * @swagger
 * /api/v1/blog/add/details:
 *   post:
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - blog-controller
 *     description: Added Blog Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: BlogDetails
 *         description: BlogDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BlogDetails'
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
* /api/v1/blog/list:
*   get:
*     tags:
*       - blog-controller
*     description: Get Blog List
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
* /api/v1/blog/single-blog/{id}:
*   get:
*     tags:
*       - blog-controller
*     description: Get Blog by id
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: Blog id
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
*   UpdateBlogDetails:
*     properties:
*       blogID:
*         type: string
*       blogTitle:
*         type: string
*       featured_img:
*         type: string
*       featured_content:
*         type: string
*       blogDescription:
*         type: string
*
*/


/**
 * @swagger
 * /api/v1/blog/update/details:
 *   put:
 *     security:
 *       - bearerAuth: [] 
 *     tags:
 *       - blog-controller
 *     description: Update Blog Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: BlogDetails
 *         description: BlogDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/UpdateBlogDetails'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */

