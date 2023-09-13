import { EXTRA_VOTE } from '../../constants/db.constants';

const REDUNDANT_CHAR_LENGTH = 2;

const getFullConsensus = (votes, results) => {
  for (let i = 0; i < votes.length; i += 1) {
    if (
      votes[i].vote &&
      (votes[i].vote !== results || votes[i].vote === EXTRA_VOTE.COFFEE)
    )
      return false;
  }
  return true;
};

export const getVoteSummary = (votes) => {
  let [results, voteOnTotal, playerResults] = ['', '', ''];
  let [voteCount, numbericVoteCount, voteSum] = [0, 0, 0];
  let [coffeeTime, fullConsensus] = [false, true];

  votes.forEach((userVoting) => {
    const { vote, username } = userVoting;
    if (vote) {
      voteCount += 1;
      playerResults += `${username} (${vote}), `;
      if (vote === EXTRA_VOTE.COFFEE) coffeeTime = true;
      else if (vote !== EXTRA_VOTE.QUESTION_MARK) {
        numbericVoteCount += 1;
        voteSum += parseInt(vote);
      }
    }
  });

  voteOnTotal = `${voteCount}/${votes.length}`;
  if (numbericVoteCount === 0) {
    results = coffeeTime ? EXTRA_VOTE.COFFEE : EXTRA_VOTE.QUESTION_MARK;
    if (results === EXTRA_VOTE.COFFEE) fullConsensus = false;
  } else {
    results = `${voteSum / numbericVoteCount}`;
    fullConsensus = getFullConsensus(votes, results);
  }

  playerResults = playerResults.substring(
    0,
    playerResults.length - REDUNDANT_CHAR_LENGTH
  );

  return { results, voteOnTotal, playerResults, coffeeTime, fullConsensus };
};
