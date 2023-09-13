import bcrypt from 'bcrypt';
import { UserTypes, DEFAULT_PHOTO_URL } from '../../constants/db.constants';
import { User } from '../models/index';

const SALT_ROUNDS = 10;

export const authService = {
  async getUserOfTypeEmail(email) {
    const existingUser = await User.findOne({ email }).lean();
    return existingUser;
  },

  async createUser({ email, password, username }) {
    const passwordhash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      email,
      password: passwordhash,
      name: username,
      type: UserTypes.EMAIL,
      photoURL: DEFAULT_PHOTO_URL,
    });
    await user.save();
    const sendUser = await User.findById(user._id)
      .select({ password: 0 })
      .lean();
    return sendUser;
  },

  async getLoggedInUserOfTypeEmail({ email, password }) {
    const user = await authService.getUserOfTypeEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    }
    return null;
  },
};
