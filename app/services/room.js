import { History, Issue, Room, Voting } from '../models/index';
import { getVoteSummary } from '../utils/history';
import { RoomStatuses } from '../../constants/db.constants';
import { MutexManager } from '../utils/MutexManager';

export const roomService = {
  async createRoom(roomName) {
    const room = new Room({ name: roomName });
    await room.save();
    return room;
  },

  async nominateVote({ roomId, userId, vote }) {
    const release = await MutexManager.acquire(roomId);
    const room = await Room.findById(roomId);
    if (!room) return null;
    try {
      const userIndex = room.voting.findIndex(
        (userVoting) => userVoting.userId === userId
      );
      if (userIndex === -1) return release();
      room.voting[userIndex].vote = vote;
      await room.save();
    } finally {
      release();
    }
  },

  async getRoomById(roomId) {
    const room = await Room.findById(roomId);
    return room;
  },

  async saveHistory(roomId) {
    const room = await Room.findById(roomId);
    if (!room) return null;
    const { results, voteOnTotal, playerResults, coffeeTime, fullConsensus } =
      getVoteSummary(room.voting);
    if (fullConsensus) room.fullConsensus += 1;
    room.status = RoomStatuses.CONCLUDED;

    let issueName = '';
    if (room.selectedIssue) {
      const issue = await Issue.findById(room.selectedIssue);
      issueName = issue.name;
      if (!isNaN(results)) {
        issue.storyPoints = Math.round(results);
        issue.save();
      }
    }

    const history = {
      room: room._id,
      issueName,
      results: isNaN(results) ? results : Math.round(results * 10) / 10,
      voteOnTotal,
      playerResults,
      coffeeTime,
      fullConsensus,
    };

    room.currentResults = history;
    room.save();

    new History({
      ...history,
      results: isNaN(results) ? results : Math.round(results),
    }).save();

    return history;
  },

  async findHistories(roomId) {
    const histories = await History.find({ room: roomId });
    return histories;
  },

  async changeRoomName(roomId, roomName) {
    const release = await MutexManager.acquire(roomId);
    try {
      const room = await Room.findById(roomId);
      if (!room) return null;
      room.name = roomName;
      await room.save();
    } finally {
      release();
    }
  },

  async setSelectedIssue(roomId, issueId) {
    const release = await MutexManager.acquire(roomId);
    try {
      const room = await Room.findById(roomId);
      if (!room) return null;
      room.selectedIssue = issueId;
      await room.save();
    } finally {
      release();
    }
  },

  async handleRemoveIssue(roomId, issueId) {
    const release = await MutexManager.acquire(roomId);
    try {
      const room = await Room.findById(roomId);
      if (!room) return null;
      if (room.selectedIssue.toString() === issueId) {
        room.selectedIssue = null;
        await room.save();
      }
    } finally {
      release();
    }
  },

  async addUserToRoom(userId, username, roomId) {
    const release = await MutexManager.acquire(roomId);
    try {
      const room = await Room.findById(roomId);
      if (!room) return null;
      const userIndex = room.voting.findIndex(
        (userVoting) => userVoting.userId === userId
      );
      if (userIndex === -1) {
        const userVoting = new Voting({
          userId,
          username,
          vote: '',
          connected: true,
        });
        room.voting.push(userVoting);
        await room.save();
      }
      return room.voting;
    } finally {
      release();
    }
  },

  async removeUserFromRoom(userId, roomId) {
    const release = await MutexManager.acquire(roomId);
    try {
      const room = await Room.findById(roomId);
      if (!room) return null;
      const userIndex = room.voting.findIndex(
        (userVoting) => userVoting.userId === userId
      );
      if (userIndex !== -1) {
        room.voting.splice(userIndex, 1);
        await room.save();
      }
      return room.voting;
    } finally {
      release();
    }
  },

  async handleUserUpdate(userId, username, roomId) {
    const release = await MutexManager.acquire(roomId);
    try {
      const room = await Room.findById(roomId);
      if (!room) return null;
      const userIndex = room.voting.findIndex(
        (userVoting) => userVoting.userId === userId
      );
      if (userIndex !== -1) {
        room.voting[userIndex].username = username;
        await room.save();
      }
      return room.voting;
    } finally {
      release();
    }
  },

  async clearRoomVoting(roomId, resetIssue) {
    const release = await MutexManager.acquire(roomId);
    try {
      const room = await Room.findById(roomId);
      if (room) {
        const votes = room.voting;
        votes.forEach((userVoting) => {
          userVoting.vote = null;
        });
        room.status = RoomStatuses.VOTING;
        room.currentResults = null;
        if (resetIssue) room.selectedIssue = null;
        await room.save();
      }
    } finally {
      release();
    }
  },

  async setSpecMode(roomId, userId, mode) {
    const release = await MutexManager.acquire(roomId);
    try {
      const room = await Room.findById(roomId);
      if (room) {
        const votes = room.voting;
        votes.forEach((userVoting) => {
          if (userVoting.userId === userId) userVoting.specMode = mode;
        });
        await room.save();
      }
    } finally {
      release();
    }
  },
};
