// 무작위 숫자 생성

// 사용자 숫자 입력, go 버튼 누르기
// 정답이면 '맞췄습니다!'
// 입력한 숫자가 정답보다 작으면 up
// 입력한 숫자가 정답보다 크면 down
// reset 버튼은 게임 초기화
// 기회 5번 (버튼 disable)
// 1~100 범위 외 숫자 입력하면 기회 차감 안 됨, '범위 밖 숫자'
// 이미 입력한 숫자를 다시 입력하면 '이미 입력한 숫자', 횟수 유지

let randomNumber = 0;
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let imgBox = document.querySelector('.img');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chanceArea = document.getElementById('chance-area');
let answerArea = document.getElementById('answer-area');
let historyArea = document.getElementById('history-area');
let chances = 3;
let gameOver = false;
let history = [];

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', inputClear);
function inputClear() {
  userInput.value = '';
}

function pickRandomNum() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log('정답:', randomNumber);
  answerArea.textContent = `정답은 ${randomNumber}`;
}

function play() {
  let userValue = userInput.value;
  if (userValue > 100 || userValue < 1) {
    imgBox.src = 'error.jpg';
    resultArea.textContent = '1에서 100 사이 숫자를 입력해 주세요.';
    return;
  }
  if (history.includes(userValue)) {
    // 줄바꿈 때문에 innerHTML 사용
    resultArea.innerHTML = '이미 입력한 숫자입니다.<br>다른 숫자를 입력해 주세요.';
    return;
  }

  chances--;
  chanceArea.textContent = `남은 기회: ${chances}`;
  if (userValue < randomNumber) {
    imgBox.src = 'up.jpg';
    resultArea.textContent = 'Up!!!';
  } else if (userValue > randomNumber) {
    imgBox.src = 'down.jpg';
    resultArea.textContent = 'Down!!!';
  } else {
    imgBox.src = 'correct.jpg';
    resultArea.textContent = `You got the number! It's ${randomNumber}`;
    chanceArea.textContent = '';
    playButton.disabled = true;
    return;
  }
  history.push(userValue);
  // 입력 내역 보여주기
  historyArea.textContent = history;

  // 기회 1번일 때 텍스트 빨간색
  if (chances == 1) {
    chanceArea.classList.add('text-danger');
  }

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    imgBox.src = 'wrong.png';
    resultArea.textContent = `Game Over! 정답은 ${randomNumber}`;
    playButton.disabled = true;
  }
}

function reset() {
  // user input 정리
  userInput.value = '';
  // 새로운 번호 생성
  pickRandomNum();
  chances = 3;
  history = [];
  gameOver = false;
  playButton.disabled = false;
  chanceArea.classList.remove('text-danger');
  imgBox.src = 'game_start.jpg';
  chanceArea.textContent = `남은 기회: ${chances}`;
  resultArea.textContent = '게임 시작!';
}

pickRandomNum();
