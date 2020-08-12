import PlayField from "./PlayField.js";
import { CONSTS } from "./static_data.js";
import Sort from "./Sort.js";

export default class GameLogic extends PlayField {
  constructor(arrVault) {
    super(arrVault);
    this.progress = false,
      this.mousePosition = {
        down: null,
        up: null,
      },
      this.conditionOfLose = true,
      this.direction = "";
  }
  

  Gameplay(e, type) {

    this.GetMousePosition(e, type);
    if (this.conditionOfLose){
    if (!this.progress) {
      this.direction = this.GetDirection();

      switch (this.direction) {
        case "right":
        this.arrVault =  this.HorizontalMove(this.arrVault, "right")
        this.arrVault = this.AddField();
          break;
        case "left":
          this.arrVault =  this.HorizontalMove(this.arrVault, "left")
          this.arrVault = this.AddField();
          break;
        case "up":
          this.arrVault =  this.VerticalMove(this.arrVault, "up")
          this.arrVault = this.AddField();
          break;
        case "down":
          this.arrVault =  this.VerticalMove(this.arrVault, "down")
          this.arrVault = this.AddField();
          break;
        default: alert('Повторите действие еще раз')
          break;
      }
      
      console.log(this.arrVault);
    }
  } else {
    alert("Game over");
  }
  }

  AddField() {
    let counter = true,
      probality,
      probabilityOfValue,
      newValue;

    let newArr = this.arrVault.map((el) => {
      let subArr = el.map((subEl) => {
        probality = Math.random().toFixed(1);
        if (subEl === 0) {
          if (probality > 0.5) {
            if (counter) {
              probabilityOfValue = Math.random().toFixed(2);
              newValue = probabilityOfValue < 0.8 ? 2 : 4;
              counter = !counter;
              return newValue;
            } else {
              return subEl;
            }
          }
          return subEl;
        } else {
          return subEl;
        }
      });
      return subArr;
    });
    return newArr;
  }

  VerticalMove(arr, direction) {
    let sort = new Sort(),
      arrForCaclValue = [null,null,null,null],
      copyArr = [...arr];

    if (direction === "down") {
      copyArr.reverse();
    }

    let newArr = copyArr.map((el, mainIndex) => {
      let lengthMainArr = copyArr.length;
      let subArr = el.map((subEl, index) => {
        let checkNextelement = true

        if (index !== lengthMainArr - 1){
          while (checkNextelement){
            if (copyArr[mainIndex + 1][index] > 0){
              if (copyArr[mainIndex + 1][index] === subEl){
                arrForCaclValue[index] = 0;
                return subEl * 2;
              } else {
                return subEl;
              }
            } 
  
          }
        }


      });
      return subArr;
    });

    if (direction === "down") {
      newArr.reverse();
      const sortedArr = sort.sortVertical(newArr, "down");
      return sortedArr;
    } else {
      const sortedArr = sort.sortVertical(newArr, "up");
      return sortedArr;
    }
    
  }

  HorizontalMove(arr, direction) {
    let sort = new Sort();
    let newArr = arr.map((el) => {
      let tempValue = null;
      if (direction === "left") {
        el.reverse();
      }
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
          let resultValue = tempValue === null ? 0 : subEl;
          tempValue = null;
          return resultValue;
        }
        if (index === 3 && tempValue != null) {
          return tempValue;
        } else {
          return 0;
        }

      });

      if (direction === "left") {
        subArr.reverse();
        const sortArr = subArr.sort((a, b) => sort.sortToLeft(a, b));
        return sortArr;
      } else {
        const sortArr = subArr.sort((a, b) => sort.sortToRight(a, b));
        return sortArr;
      }
    });

    return newArr;
  }

  GetDirection() {
    let valueX = this.mousePosition.up.X - this.mousePosition.down.X,
      valueY = this.mousePosition.up.Y - this.mousePosition.down.Y;

    if (valueX >= CONSTS.POSITIVE_LIMIT) {
      if (valueY >= CONSTS.NEGATIVE_LIMIT && valueY <= CONSTS.POSITIVE_LIMIT) {
        return "right";
      }
    } else if (valueX <= CONSTS.NEGATIVE_LIMIT) {
      if (valueY >= CONSTS.NEGATIVE_LIMIT && valueY <= CONSTS.POSITIVE_LIMIT) {
        return "left";
      }
    } else if (valueY >= CONSTS.POSITIVE_LIMIT) {
      if (valueX >= CONSTS.NEGATIVE_LIMIT && valueX <= CONSTS.POSITIVE_LIMIT) {
        return "down";
      }
    } else if (valueY <= CONSTS.NEGATIVE_LIMIT) {
      if (valueX >= CONSTS.NEGATIVE_LIMIT && valueX <= CONSTS.POSITIVE_LIMIT) {
        return "up";
      }
    } else {
      this.progress = false;
      return;
    }
  }

  GetMousePosition(e, type) {
    this.progress = !this.progress;

    if (type === "down") {
      this.mousePosition.down = { X: e.clientX, Y: e.clientY };
      return;
    } else if (type === "up") {
      this.mousePosition.up = { X: e.clientX, Y: e.clientY };
      return;
    } else {
      console.log("Errow way");
      return;
    }
  }

  CalculateCondition(){
    let localCondition = false;
    this.arrVault.forEach(el =>{
      el.forEach(subEl => {
        subEl === 0 ? localCondition = true : localCondition = false;
      })
    })
    return localCondition
  }
}

