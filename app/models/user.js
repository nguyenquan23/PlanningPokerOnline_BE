import mongoose from 'mongoose';
import { UserTypes } from '../../constants/db.constants';

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of user
 *           example: 6494131fe94cdbd901f3372b
 *         name:
 *           type: string
 *           description: The name of user
 *           example: Minh Nhật Trần
 *         type:
 *           type: string
 *           enum:
 *             - 'guest'
 *             - 'email'
 *             - 'google'
 *           default: 'guest'
 *           description: The type of user
 *           example: 'google'
 *         photoURL:
 *           type: string
 *           description: The user's avatar url
 *           example: https://lh3.googleusercontent.com/a/AAcHTteEVtZ1HndvQ5wTxYrvlzcAvItAOR33k7V8Zm-y=s96-c
 *         email:
 *           type: string
 *           description: The user's email
 *           example: minhnhat912002@gmail.com
 *         password:
 *           type: string
 *           description: The password of user's type 'email'
 */
const userSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: Object.values(UserTypes),
    default: UserTypes.GUEST,
  },
  photoURL: String,
  email: String,
  password: String,
});

export default mongoose.model('User', userSchema);
