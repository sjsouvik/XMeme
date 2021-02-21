const express = require("express");
const router = express.Router();

//importing controllers for all routes
const {
  addMeme,
  getAllMemes,
  getMemeById,
  updateMemeById,
  deleteMeme,
} = require("../controllers/meme");

/**
 * @swagger
 * components:
 *   schemas:
 *     Meme:
 *       type: object
 *       properties:
 *           _id:
 *             type: string
 *             description: The meme ID.
 *             example: 60202bec5a89c167c8b42582
 *           name:
 *             type: string
 *             description: The user's name.
 *             example: Abhijit
 *           url:
 *             type: string
 *             description: URL of the meme
 *             example: https://homepages.cae.wisc.edu/~ece533/images/fruits.png
 *           caption:
 *             type: string
 *             description: Caption for the meme
 *             example: This is a meme
 *
 */

/**
 * @swagger
 * tags:
 *   name: Memes
 *   description: Memes managing API
 */

/**
 * @swagger
 * /memes:
 *    post:
 *      summary: Create a new meme
 *      tags: [Memes]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  name:
 *                    type: string
 *                    description: The user's name.
 *                    example: Abhijit
 *                  url:
 *                    type: string
 *                    description: URL of the meme
 *                    example: https://homepages.cae.wisc.edu/~ece533/images/fruits.png
 *                  caption:
 *                    type: string
 *                    description: Caption for the meme
 *                    example: This is a meme
 *
 *      responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID of the meme which is posted
 *                     example: 60202bec5a89c167c8b42582
 *         400:
 *           description: Bad request.
 *         409:
 *           description: Conflict.
 */

//Create a meme
router.post("/", addMeme);

/**
 * @swagger
 * /memes:
 *    get:
 *     summary: Retrieve a list of latest 100 memes created.
 *     description: Retrieve a list of latest 100 memes created from backend. Can be used to populate a list of memes when prototyping or testing an API.
 *     tags: [Memes]
 *     responses:
 *       200:
 *         description: A list of memes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   $ref: "#/components/schemas/Meme"
 *
 *       404:
 *         description: No memes found.
 *
 *
 */

//GET latest 100 memes
router.get("/", getAllMemes);

/**
 * @swagger
 * /memes/{id}:
 *   get:
 *     summary: Retrieve a single meme based on ID.
 *     description: Retrieve a single meme. Can be used to populate a meme details when prototyping or testing an API.
 *     tags: [Memes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meme to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single meme.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Meme"
 *       404:
 *         description: No meme found for the given ID.
 *
 */

//GET a specific meme by its ID
router.get("/:memeId", getMemeById);

/**
 * @swagger
 * /memes/{id}:
 *  patch:
 *    summary: Update the meme by the id
 *    tags: [Memes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The meme id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                url:
 *                  type: string
 *                  description: URL of the meme
 *                  example: https://homepages.cae.wisc.edu/~ece533/images/fruits.png
 *                caption:
 *                  type: string
 *                  description: Caption for the meme
 *                  example: This is a meme
 *
 *    responses:
 *      200:
 *        description: The meme was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Meme'
 *      404:
 *        description: The Meme was not found
 *      500:
 *        description: Some error happened
 */

//Update a meme
router.patch("/:memeId", updateMemeById);

/**
 * @swagger
 * /memes/{id}:
 *   delete:
 *     summary: Remove the meme by id
 *     tags: [Memes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meme id
 *
 *     responses:
 *       200:
 *         description: The meme was deleted
 *       404:
 *         description: The meme was not found
 */

//Delete a meme
router.delete("/:memeId", deleteMeme);

module.exports = router;
