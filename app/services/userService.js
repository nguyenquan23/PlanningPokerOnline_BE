import { User } from '../models/index';
import { UserTypes, DEFAULT_PHOTO_URL } from '../../constants/db.constants';

export const UserService = {
  createGuestUser: async (username) => {
    const user = new User({
      name: username,
      type: UserTypes.GUEST,
      photoURL: DEFAULT_PHOTO_URL,
    });
    await user.save();

    return user;
  },

  createGoogleOAuthUser: async (data) => {
    const user = new User({
      name: data.name,
      type: UserTypes.GOOGLE,
      email: data.email,
      photoURL: data.picture,
    });
    await user.save();

    return user;
  },

  findGoogleOAuthUser: async (email) => {
    const user = await User.findOne({
      email,
      type: UserTypes.GOOGLE,
    });

    return user;
  },

  findUserById: async (id) => {
    const user = await User.findById(id).select({ password: 0 }).lean();
    return user;
  },

  updateProfile: async ({ userId, displayName, photoURL }) => {
    const user = await User.findById(userId);
    if (user) {
      user.name = displayName;
      user.photoURL = photoURL;
      await user.save();
      return user;
    }
    return null;
  },
};
