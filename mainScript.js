import PlayField from './PlayField.js';
import GameLogic from './GameLogic.js';

let Field = new PlayField();
Field.createField();

playfield.addEventListener("click", (e)=>Field.movement(e))
