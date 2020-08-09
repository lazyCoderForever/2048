import PlayField from './PlayField.js';
import {CONSTS} from './static_data.js';
   export default class GameLogic extends PlayField {
        constructor(arrVault){ 
            super(arrVault);
            this.progress = false;
            this.mousePosition = {
                down: null,
                up: null,
            };
           
        }

        Gameplay(e, type){
            this.GetMousePosition(e, type);

            if (!this.progress){
                console.log(this.GetDirection());
            }

        }

        GetDirection(){
            let valueX = this.mousePosition.up.X -this.mousePosition.down.X,
            valueY = this.mousePosition.up.Y -this.mousePosition.down.Y;

            if (valueX >= CONSTS.POSITIVE_LIMIT ) {
                if (valueY >= CONSTS.NEGATIVE_LIMIT && valueY <= CONSTS.POSITIVE_LIMIT){  
                  return 'right'
                } 
              } else if (valueX <= CONSTS.NEGATIVE_LIMIT){
                if (valueY >= CONSTS.NEGATIVE_LIMIT && valueY <= CONSTS.POSITIVE_LIMIT){
                  return 'left'
                } 
              } else if (valueY >= CONSTS.POSITIVE_LIMIT){
                if (valueX >= CONSTS.NEGATIVE_LIMIT && valueX <= CONSTS.POSITIVE_LIMIT){
                  return 'down'
                } 
              } else if (valueY <= CONSTS.NEGATIVE_LIMIT) {
                if (valueX >= CONSTS.NEGATIVE_LIMIT && valueX <= CONSTS.POSITIVE_LIMIT){
                  return 'up'
                } 
              } else {
                this.progress = false;
                alert("Повторите ввод направления")
                return;
            }
        }

        MoveSquares(){
            
        }

        GetMousePosition(e,type){
            this.progress = !this.progress;

            if (type === 'down'){
                this.mousePosition.down = {X: e.clientX, Y: e.clientY};
                return;
            } else if (type === 'up'){
                this.mousePosition.up = {X: e.clientX, Y: e.clientY};
                return;
            } else {
                console.log("Errow way");
                return;
            }
        }
}

    
