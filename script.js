const MOVES = {
rock: { icon: '✊', beats: 'scissors' },
  paper: { icon: '✋', beats: 'rock' },
scissors: { icon: '✌️', beats: 'paper' }
};
const TARGET_SCORE = 5;
let playerScore = 0;
  let computerScore = 0;
let gameOver = false;
 const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
   const playerCardEl = document.getElementById('player-card');
const computerCardEl = document.getElementById('computer-card');
  const messageEl = document.getElementById('message');
 const choiceBtns = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');
function getRandomMove(){
const keys = Object.keys(MOVES);
    const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}
  function evaluateRound(playerMove, computerMove){
 if (playerMove === computerMove) return 'draw';
     return MOVES[playerMove].beats === computerMove ? 'win' : 'loss';
}
function handleChoice(playerMove){
  if (gameOver) return;
const computerMove = getRandomMove();
    const outcome = evaluateRound(playerMove, computerMove);
  playerCardEl.textContent = MOVES[playerMove].icon;
  computerCardEl.textContent = MOVES[computerMove].icon;
  playerCardEl.className = 'choice-card';
     computerCardEl.className = 'choice-card';
 messageEl.className = 'message-banner';
if (outcome === 'win'){
  playerScore++;
     playerScoreEl.textContent = playerScore;
 playerCardEl.classList.add('win');
      computerCardEl.classList.add('loss');
  messageEl.textContent = 'You win this round!';
    messageEl.classList.add('win');
 } else if (outcome === 'loss'){
 computerScore++;
    computerScoreEl.textContent = computerScore;
 playerCardEl.classList.add('loss');
      computerCardEl.classList.add('win');
  messageEl.textContent = 'Computer wins this round!';
    messageEl.classList.add('loss');
   } else {
playerCardEl.classList.add('draw');
    computerCardEl.classList.add('draw');
  messageEl.textContent = "It's a draw!";
 messageEl.classList.add('draw');
 }
    checkGameOver();
}
  function checkGameOver(){
  if (playerScore >= TARGET_SCORE){
gameOver = true;
    messageEl.textContent = '🎉 Congratulations! You won the match!';
  messageEl.className = 'message-banner win';
 disableControls(true);
 } else if (computerScore >= TARGET_SCORE){
  gameOver = true;
   messageEl.textContent = '💻 Game Over! Computer won the match!';
  messageEl.className = 'message-banner loss';
    disableControls(true);
}
  }
function disableControls(disabled){
   choiceBtns.forEach(btn => {
btn.style.opacity = disabled ? '0.5' : '1';
    btn.style.pointerEvents = disabled ? 'none' : 'auto';
  });
}
 function resetGame(){
  playerScore = 0;
computerScore = 0;
   gameOver = false;
 playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
    playerCardEl.textContent = '❓';
  computerCardEl.textContent = '❓';
 playerCardEl.className = 'choice-card';
    computerCardEl.className = 'choice-card';
  messageEl.textContent = 'Choose your move to begin!';
 messageEl.className = 'message-banner';
    disableControls(false);
}
 choiceBtns.forEach(btn => {
   btn.addEventListener('click', () => {
 const choice = btn.getAttribute('data-choice');
    handleChoice(choice);
  });
});
  resetBtn.addEventListener('click', resetGame);