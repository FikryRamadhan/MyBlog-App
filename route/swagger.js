/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirm_password
 *       properties:
 *         name:
 *           type: string
 *           description: Masukan nama anda
 *         email:
 *           type: string
 *           description:  masukan email anda
 *         password:
 *           type: string
 *           description: Masukan password anda
 *         confirm_password:
 *           type: string
 *           description: Konfirmasi password anda
 *         
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage API users
 * /users:
 *   get:
 *     summary: Data semua member.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Data semua member
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *   post:
 *     summary: Tambah buku baru 
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description:  masukan email anda
 *         password:
 *           type: string
 *           description: Masukan password anda     
 */


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth User
 * /auth/login:
 *   post:
 *     summary: Tambah buku baru 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Authenticasi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 */