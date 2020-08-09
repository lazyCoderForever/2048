import PlayField from './PlayField.js';
import {CONSTS} from './static_data.js';
import {compareArr} from './sort.js';
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
              console.log(this.MoveRight(this.arrVault))
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

        MoveRight(arr){
          console.log(arr);
            let newArr = arr.map((el) => {
              let tempValue = null;
              let subArr = el.map((subEl, index) => {
                if (subEl > 0) {
                  if (index === 3) {
                    if (tempValue != null) {
                      if (tempValue === subEl) {
                        return subEl * 2;
                      }
                      if (tempValue / 2 === subEl) {
                        return tempValue;
                      }
                    }
                    return subEl;
                  }
                  if (tempValue / 2 === subEl) {
                    let resultValue = tempValue;
                    tempValue = null;
                    return resultValue;
                  }
                  if (el[index + 1] === 0) {
                    tempValue = subEl;
                    return 0;
                  }
          
                  if (el[index + 1] === subEl) {
                    tempValue = subEl * 2;
                    return 0;
                  } else {
                    return subEl;
                  }
                }
                if (el[index + 1] > 0 && index === 2 && el[index + 1] != tempValue) {
                  let resultValue = tempValue;
                  tempValue = null;
                  return resultValue;
                }
                if (index === 3 && tempValue != null) {
                  return tempValue;
                } else {
                  return 0;
                }
              });
              subArr = subArr.sort(compareArr)
              return subArr;
            });

            return newArr;
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

    
