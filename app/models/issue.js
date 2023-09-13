import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Issue:
 *       type: object
 *       required:
 *         - room
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of issue
 *           example: 64993b7a8af26a44339a60dc
 *         name:
 *           type: string
 *           description: The name of user
 *           example: write api-docs
 *         room:
 *           type: string
 *           description: The id of room
 *           example: 649909f49a96cb5a197ce741
 *         index:
 *           type: number
 *           description: The order of issue in room
 *           example: 1
 *         storyPoints:
 *           type: number
 *           nullable: true
 *           default: null
 *           description: The story points of issue
 */
const issueSchema = new Schema({
  name: String,
  room: { type: Schema.Types.ObjectId, required: true },
  index: Number,
  storyPoints: {
    type: Number,
    default: null,
  },
});

export default mongoose.model('Issue', issueSchema);
