
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
 *  /api/v1/product/upload/images/{id}:
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
 *       - name: id
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
