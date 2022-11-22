import groupImg from '../../../images/Group.png';

export default `
  <div class="container container--jc">
    <h1 class="title">Memory game</h1>
    <img class="score-img" src=${groupImg} width="508" height="266" alt="">
    <p class="content">Поздравляем!</p>
    <p class="content">Ваш итоговый счёт: <span id="result">1234</span></p>
    <a class="link link--mb20" name="game">Ещё раз</a>
  </div>
`.trim();
