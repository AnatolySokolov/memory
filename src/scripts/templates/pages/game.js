import gameSettings from '../../../gameSettings';

export default `
  <div class="container container--pt30">
    <div class="wrapper">
      <a class="link" name="game">Начать заного</a>
      <p class="score">Очки: <span id="score-output">0</span></p>
    </div>
    <ul class="game-table" id="table">
      ${'<li class="card-item"></li>'.repeat(gameSettings.TOTAL_PAIRS * 2)}
    </ul>
  </div>
`.trim();
