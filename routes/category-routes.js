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
 *   CategoryDetails:
 *     properties:
 *       categoryTitle:
 *         type: string
 *       slug:
 *         type: string
 *       parentCategoryId:
 *         type: string
 * 
 */




/**
 * @swagger
 * /api/v1/category/add:
 *   post:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - category-controller
 *     description: Add Category Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: CategoryDetails
 *         description: CategoryDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/CategoryDetails'
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
* /api/v1/category/list:
*   get:
*     tags:
*       - category-controller
*     description: Get Category List
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
 *   CategoryDetailsObj:
 *     properties:
 *       categoryId:
 *         type: string
 *       categoryTitle:
 *         type: string 
 *       slug: 
 *         type: string
 *       parentCategoryId:
 *         type: string     
 * 
 */


 /**
 * @swagger
 * /api/v1/category/update:
 *   put:
 *     security:
 *       - bearerAuth: []  
 *     tags:
 *       - category-controller
 *     description: Update Category Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Category
 *         description: update Category details
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/CategoryDetailsObj'
 *     responses:
 *       200:
 *         description: Successfully Updated
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */