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