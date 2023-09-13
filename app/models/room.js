import mongoose from 'mongoose';
import {
  ROOM_NAME_DEFAULT,
  RoomStatuses,
  VotingSystems,
} from '../../constants/db.constants';
import { votingSchema } from './voting';
import { historySchema } from './history';

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of room
 *           example: 649909f49a96cb5a197ce741
 *         name:
 *           type: string
 *           description: The name of room
 *           example: Planning poker game
 *         fullConsensus:
 *           type: number
 *           default: 0
 *           description: Number of full consensus vote in room
 *           example: 3
 *         votingSystem:
 *           type: array
 *           default: ['0','1','2','3','5','8','13','21','34','55','89','?','coffee']
 *           description: The order of issue in room
 *         status:
 *           type: string
 *           enum:
 *             - ready
 *             - voting
 *             - concluded
 *           default: ready
 *           description: The current status of room
 *         voting:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Voting'
 *           description: The current result of user voting in room
 *         currentResult:
 *           type: object
 *           $ref: '#/components/schemas/History'
 *
 */
const roomSchema = new Schema({
  name: {
    type: String,
    default: ROOM_NAME_DEFAULT,
  },
  fullConsensus: {
    type: Number,
    default: 0,
  },
  votingSystem: {
    type: Array,
    default: VotingSystems.DEFAULT,
  },
  status: {
    type: String,
    enum: Object.values(RoomStatuses),
    default: RoomStatuses.VOTING,
  },
  voting: [votingSchema],
  selectedIssue: Schema.Types.ObjectId,
  currentResults: historySchema,
});

export default mongoose.model('Room', roomSchema);
