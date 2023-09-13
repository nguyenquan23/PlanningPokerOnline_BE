import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Voting:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The id of user has this vote
 *           example: 6494131fe94cdbd901f3372b
 *         username:
 *           type: string
 *           description: The name of user has this vote
 *           example: name
 *         vote:
 *           type: string
 *           nullable: true
 *           description: The vote value
 *           example: coffee
 *         connected:
 *           type: boolean
 *           default: true
 *           description: The staus that user is still in room or not
 *           example: true
 *         specMode:
 *           type: boolean
 *           default: false
 *           description: The staus that user is on spectator mode
 *           example: false
 */
export const votingSchema = new Schema(
  {
    userId: {
      type: String,
      ref: 'User',
    },
    username: String,
    vote: String,
    connected: {
      type: Boolean,
      default: true,
    },
    specMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

export default mongoose.model('Voting', votingSchema);
