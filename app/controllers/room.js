import { HTTP_STATUS } from '../../constants/HTTPStatusCode';
import { RESPONSE_MESSAGE } from '../../constants/message';
import { roomService } from '../services/room';
import { responseUtils } from '../utils/response';

export const roomController = {
  async createRoom(req, res) {
    try {
      const { roomName } = req.body;
      const room = await roomService.createRoom(roomName);
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: room,
      });
    } catch {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },

  async nominateVote(req, res) {
    try {
      const { roomId, user, vote } = req.body;
      await roomService.nominateVote({
        roomId,
        userId: user,
        vote,
      });
      responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: RESPONSE_MESSAGE.SAVE_USERVOTING_SUCCESS,
      });
    } catch (err) {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },

  async getRoomById(req, res) {
    try {
      const roomId = req.params.id;
      const room = await roomService.getRoomById(roomId);
      responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: room,
      });
    } catch {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },

  async saveHistory(req, res) {
    try {
      const {
        issueName,
        room,
        results,
        agreements,
        durations,
        date,
        voteOnTotal,
        playerResults,
      } = req.body;
      await roomService.saveHistory({
        issueName,
        room,
        results,
        agreements,
        durations,
        date,
        voteOnTotal,
        playerResults,
      });
      responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: RESPONSE_MESSAGE.SAVE_HISTORY_SUCCESS,
      });
    } catch {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },

  async getHistory(req, res) {
    try {
      const { id } = req.params;
      const histories = await roomService.findHistories(id);
      responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: histories,
      });
    } catch {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },
};
