
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
 *  /api/v1/product/upload/images/{productId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - product-controller
 *     description: Update image in products
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         type: file
 *         name: image
 *         description: The file to upload.
 *         required: true
 *       - name: productId
 *         description: Product id
 *         in: path
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Uploaded successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */



/**
 * @swagger
 *  /api/v1/featured/product/upload/images/{productId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - product-controller
 *     description: Update image in products
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         type: file
 *         name: image
 *         description: The file to upload.
 *         required: true
 *       - name: productId
 *         description: Product id
 *         in: path
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Uploaded successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */





/**
 * @swagger
 *  /api/v1/product/remove/images/{productId}/{productImgId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - product-controller
 *     description: Update image in products
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productId
 *         description: Product id
 *         in: path
 *         required: true
 *         type: "string"
 *       - name: productImgId
 *         description: productImg Id
 *         in: path
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Uploaded successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */
