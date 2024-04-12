const words = "They had made it to Las Vegas, wide-eyed and with so much hope and energy. They had planned the trip for more than a year and both were so excited they could barely control themselves. They still hadn't realized that Las Vegas promised a place where dreams come true, it was actually the place where dreams came to die.".split(' ');
const wordsCount = words.length;
function randomWord()
{
  const randomIndex = Math.ceil(Math.random()*wordsCount);
  return words[randomIndex];
}

function formatWord(word)
{
  return `<div class="word">
            <span class="letter">
              ${word.split('').join('</span><span class="letter">')}
            </span>
          </div>`;
}

function newGame()
{
  document.getElementById('words').innerHTML = '';
  for(let i =0;i<200;i++)
  {
    document.getElementById('words').innerHTML += formatWord(randomWord());
  }
}
newGame();