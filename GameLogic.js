import PlayField from "./PlayField.js";
import { CONSTS } from "./static_data.js";
import Sort from "./sort.js";

export default class GameLogic extends PlayField {
  constructor(arrVault, score) {
    super(arrVault, score);
    (this.progress = false),
      (this.mousePosition = {
        down: null,
        up: null,
      }),
      (this.conditionOfLose = true),
      (this.direction = "");
  }

  Gameplay(e, type) {
    let prevScore = this.score;

    this.GetMousePosition(e, type);

    if (!this.progress) {

      this.direction = this.GetDirection();
      
      switch (this.direction) {
        case "right":
          this.arrVault = this.HorizontalMove(this.arrVault, "right");
          if (this.CalculateConditionOfWin()) {
            break;
          }
          if (this.CalculateConditionOfLose()) {
            this.arrVault = this.AddField();
            super.UpdatePlayField(this.direction);
            break;
          } else {
            alert("Вы проиграли");
            this.arrVault = CONSTS.DEFAULT_PLAYFIELD;
            this.score = 0;
            super.UpdatePlayField("left");
            break;
          }
        case "left":
          this.arrVault = this.HorizontalMove(this.arrVault, "left");
          if (this.CalculateConditionOfWin()) {
            break;
          }
          if (this.CalculateConditionOfLose()) {
            this.arrVault = this.AddField();
            super.UpdatePlayField(this.direction);
            break;
          } else {
            alert("Вы проиграли");
            this.arrVault = CONSTS.DEFAULT_PLAYFIELD;
            this.score = 0;
            super.UpdatePlayField("left");
            break;
          }
        case "up":
          this.arrVault = this.VerticalMove(this.arrVault, "up");
          if (this.CalculateConditionOfWin()) {
            break;
          }
          if (this.CalculateConditionOfLose()) {
            this.arrVault = this.AddField();
            super.UpdatePlayField(this.direction);
            break;
          } else {
            alert("Вы проиграли");
            this.arrVault = CONSTS.DEFAULT_PLAYFIELD;
            this.score = 0;
            super.UpdatePlayField("left");
            break;
          }
        case "down":
          this.arrVault = this.VerticalMove(this.arrVault, "down");
          if (this.CalculateConditionOfWin()) {
            break;
          }
          if (this.CalculateConditionOfLose()) {
            this.arrVault = this.AddField();
            super.UpdatePlayField(this.direction);
            break;
          } else {
            alert("Вы проиграли");
            this.arrVault = CONSTS.DEFAULT_PLAYFIELD;
            this.score = 0;
            super.UpdatePlayField("left");
            break;
          }
        default:
          alert("Выбирете точное направление");
          break;
      }
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
    let copyInputArr = direction === "down" ? [...arr.reverse()] : [...arr],
      lengthInputArr = arr.length,
      vaultTempValu = [null, null, null, null],
      sort = new Sort();

    let newArr = copyInputArr.map((el, mainIndex) => {
      let subArr = el.map((subEl, subIndex) => {
        let counter = 1;
        let condition = true;

        if (subEl > 0) {
          //Провекрка значения во временном хранилище на !== null
          if (vaultTempValu[subIndex] !== null) {
            const getTempValue = vaultTempValu[subIndex];
            vaultTempValu[subIndex] = null;
            condition = false;

            return getTempValue;
          }
          //Проверка на последний элемент в главном массиве  arr
          if (mainIndex === lengthInputArr - 1) {
            if (vaultTempValu[subIndex] !== null) {
              condition = false;
              return vaultTempValu[subIndex];
            } else {
              condition = false;
              return subEl;
            }
          }
          //Обход элементов ниже, пока-что не будет найдено  === число или !== subEl. Или на конец массива
          while (mainIndex + counter < lengthInputArr && condition) {
            if (copyInputArr[mainIndex + counter][subIndex] > 0) {
              if (copyInputArr[mainIndex + counter][subIndex] === subEl) {
                vaultTempValu[subIndex] = 0;
                condition = false;
                this.score += subEl * 2;
                return subEl * 2;
              } else {
                condition = false;
                return subEl;
              }
            } else if (mainIndex + counter === lengthInputArr - 1) {
              return subEl;
            } else {
              counter++;
            }
          }
        } else {
          return 0;
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
    let newArr = arr.map((el, mainIndex) => {
      let tempValue = null;
      if (direction === "left") {
        el.reverse();
      }
      let subArr = el.map((subEl, subIndex) => {
        //Если элемент > 0
        if (subEl > 0) {
          //Проверка на последний эелемент
          if (subIndex === el.length - 1) {
            if (tempValue != null) {
              if (tempValue === subEl) {
                this.score += subEl * 2;
                return subEl * 2;
              }
            }
            return subEl;
          }
          if (tempValue === subEl) {
            let resultValue = subEl * 2;
            tempValue = null;
            this.score += resultValue;
            return resultValue;
          }
          if (el[subIndex + 1] === 0) {
            tempValue = subEl;
            return 0;
          }

          if (el[subIndex + 1] === subEl) {
            tempValue = subEl;
            return 0;
          } else {
            return subEl;
          }
        }
        //Если 0 стоит в конце
        if (subIndex === el.length - 1) {
          return tempValue === null ? subEl : tempValue;
        }
        //Если
        if (el[subIndex + 1] > 0) {
          if (el[subIndex + 1] === tempValue) {
            return 0;
          } else {
            return tempValue === null ? subEl : tempValue;
          }
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
    if (this.mousePosition.up === null){
      this.mousePosition.up = this.mousePosition.down
    }
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

  CalculateConditionOfLose() {
    let localCondition = false;
    this.arrVault.forEach((el) => {
      if (!localCondition) {
        el.forEach((subEl) => {
          if (!localCondition) {
            subEl === 0 ? (localCondition = true) : (localCondition = false);
          }});
      }
    });
    return localCondition;
  }

  CalculateConditionOfWin() {
    let win = false;
    this.arrVault.forEach((subArr)=>{
      if(!win){
        subArr.forEach(subEl=>{
        if (subEl === 2048){
          win = true;
        }})      
    }})
    if (win){
      let score = document.querySelector("#score");
      score.innerText = `${this.score}`;
      super.UpdatePlayField("left");
      setTimeout(() => {
        alert("Вы победили!");
        this.arrVault = CONSTS.DEFAULT_PLAYFIELD;
        this.score = 0;
        super.UpdatePlayField("left");
      }, 500);
    }
    return win
}
}
