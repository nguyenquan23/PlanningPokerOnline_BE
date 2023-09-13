import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     History:
 *       type: object
 *       required:
 *         - room
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of history
 *           example: 34942793fbfa23d4157c250d
 *         issue:
 *           type: string
 *           description: The id of issue
 *           example: 64a4f22f4525021dea2affc5
 *         room:
 *           type: string
 *           description: The id of room
 *           example: 649909f49a96cb5a197ce741
 *         results:
 *           type: number
 *           description: The result of vote for the issue
 *           example: 0.8
 *         date:
 *           type: date
 *           description: 2023-06-26T07:56:13.359Z
 *         voteOnTotal:
 *           type: string
 *           description: number of vote over number of user in that vote
 *           example: 2/3
 *         playerResults:
 *           type: string
 *           description: Detailed result of vote
 *           example: codeholic(5), playboy(1)
 *         coffeeTime:
 *           type: boolean
 *           description: True if someone wanna break
 *           example: false
 *         fullConsensus:
 *           type: boolean
 *           description: True if every one is agree with the same vote value
 *           example: true
 */
export const historySchema = new Schema({
  issueName: String,
  room: { type: Schema.Types.ObjectId, required: true },
  results: String,
  date: {
    type: Date,
    default: Date.now,
  },
  voteOnTotal: String,
  playerResults: String,
  coffeeTime: {
    type: Schema.Types.Boolean,
    default: false,
  },
  fullConsensus: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

export default mongoose.model('VotingHistory', historySchema);
