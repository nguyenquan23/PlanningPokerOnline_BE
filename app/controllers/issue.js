import { HTTP_STATUS } from '../../constants/HTTPStatusCode';
import { RESPONSE_MESSAGE } from '../../constants/message';
import { responseUtils } from '../utils/response';
import { issueService } from '../services/issue';

export const issueController = {
  createIssue: async (req, res) => {
    try {
      const { name, room, index } = req.body;
      const issue = await issueService.createIssue({ name, room, index });
      return responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.CREATED,
        data: issue,
      });
    } catch (err) {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const issue = await issueService.getIssueById(id);
      if (issue) {
        return responseUtils.sendSuccess(res, {
          status: HTTP_STATUS.OK,
          data: issue,
        });
      }

      responseUtils.sendError(res, {
        status: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGE.NOT_FOUND,
      });
    } catch (err) {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },

  getIssuesByRoomId: async (req, res) => {
    try {
      const { id } = req.params;
      const issueList = await issueService.getIssuesByRoomId(id);
      return responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: issueList,
      });
    } catch (err) {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },

  deleteIssue: async (req, res) => {
    try {
      const { id } = req.params;
      await issueService.deleteIssue(id);
      return responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: {
          message: RESPONSE_MESSAGE.DELETED,
        },
      });
    } catch (err) {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },
};
