import { Issue } from '../models/index';

export const issueService = {
  async createIssue({ name, room, index }) {
    const issue = new Issue({ name, room, index });
    await issue.save();
    return issue;
  },

  async getIssueById(id) {
    const issue = await Issue.findById(id);
    return issue;
  },

  async getIssuesByRoomId(roomId) {
    const issueList = await Issue.find({ room: roomId });
    return issueList;
  },

  async changeIssueName(issueId, issueName) {
    const issue = await Issue.findById(issueId);
    if (!issue) return;
    issue.name = issueName;
    await issue.save();
  },

  async deleteIssue(id) {
    await Issue.deleteOne({
      _id: id,
    });
  },
};
