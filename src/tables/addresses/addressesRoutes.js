import express from "express";
import addressesController from "../addresses/addressesController.js";
import verifyUser from "../../middlewares/authUser.js";

const router = express.Router();

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Retrieve an address by ID
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the address to retrieve
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The address details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 street:
 *                   type: string
 *                 address_number:
 *                   type: integer
 *                 floor:
 *                   type: string
 *                 apartment:
 *                   type: string
 *                 city:
 *                   type: string
 *                 postal_code:
 *                   type: string
 *                 country:
 *                   type: string
 *                 user_id:
 *                   type: integer
 *       404:
 *         description: Address not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /addresses/user/{user_id}:
 *   get:
 *     summary: Retrieve address by user ID
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID for which to retrieve the address
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The address details for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 street:
 *                   type: string
 *                 address_number:
 *                   type: integer
 *                 floor:
 *                   type: string
 *                 apartment:
 *                   type: string
 *                 city:
 *                   type: string
 *                 postal_code:
 *                   type: string
 *                 country:
 *                   type: string
 *                 user_id:
 *                   type: integer
 *       404:
 *         description: Address not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     parameters:
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               address_number:
 *                 type: integer
 *               floor:
 *                 type: string
 *               apartment:
 *                 type: string
 *               city:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               country:
 *                 type: string
 *               user_id:
 *                 type: integer
 *             required:
 *               - street
 *               - address_number
 *               - city
 *               - postal_code
 *               - country
 *               - user_id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Address successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       400:
 *         description: Missing required address fields
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /addresses/create/{user_id}:
 *   post:
 *     summary: Create an empty address for a user
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID for which to create the empty address
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Empty address successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 id:
 *                   type: integer
 *       400:
 *         description: User ID is required
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /addresses/user/{user_id}:
 *   patch:
 *     summary: Update an address by user ID
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID to match the address with
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               address_number:
 *                 type: integer
 *               floor:
 *                 type: string
 *               apartment:
 *                 type: string
 *               city:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               country:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Address successfully updated
 *       404:
 *         description: Address not found
 *       401:
 *         description: Unauthorized
 */

router
  .get("/:id", verifyUser, addressesController.getAddressByIdController) // Obtener dirección por ID
  .get("/user/:user_id", verifyUser, addressesController.getAddressByUserIdController) // Obtener dirección por ID de usuario
  .post("/", verifyUser, addressesController.createAddressController) // Crear una nueva dirección
  .post("/create/:user_id", addressesController.createEmptyAddressController) //Crea una direccion solo con el user_id
  .patch("/user/:user_id", verifyUser, addressesController.updateAddressByUserIdController); // Actualizar dirección por ID

export default router;
