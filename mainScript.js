import PlayField from './PlayField.js';
import GameLogic from './GameLogic.js';

let Field = new PlayField();
Field.CreatePlayField();

let Game = new GameLogic();

playfield.addEventListener("mousedown", (e)=>Game.Gameplay(e, 'down'))
playfield.addEventListener("mouseup", (e)=>Game.Gameplay(e, 'up'))
