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

  //   if (this.conditionOfLose = this.CalculateCondition()){
   if (!this.progress) {
    super.UpdatePlayField();
  //     this.direction = this.GetDirection();

  //     switch (this.direction) {
  //       case "right":
  //       this.arrVault =  this.HorizontalMove(this.arrVault, "right")
  //       this.arrVault = this.AddField();
  //         break;
  //       case "left":
  //         this.arrVault =  this.HorizontalMove(this.arrVault, "left")
  //         this.arrVault = this.AddField();
  //         break;
  //       case "up":
  //         this.arrVault =  this.VerticalMove(this.arrVault, "up")
  //         this.arrVault = this.AddField();
          
  //         break;
  //       case "down":
  //         this.arrVault =  this.VerticalMove(this.arrVault, "down")
  //         this.arrVault = this.AddField();
  //         console.log(12);
  //         break;
  //       default: alert('Повторите действие еще раз')
  //         break;
  //     }
      
  //     console.log(this.arrVault);
  //   }
  // } else {
  //   alert("Game over");
  //   this.arrVault  = CONSTS.DEFAULT_PLAYFIELD
  //   return
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


  
  VerticalMove(arr, direction){
    let copyInputArr = direction === 'down' ? [...arr.reverse()] : [...arr],
    lengthInputArr = arr.length,
    vaultTempValu = [null,null,null,null],
    sort = new Sort();
  
    let newArr = copyInputArr.map((el, mainIndex)=>{
      let subArr = el.map((subEl,subIndex) => {
        let counter = 1;
        let condition = true;
  
          if (subEl > 0){
            //Провекрка значения во временном хранилище на !== null
            if (vaultTempValu[subIndex] !== null) {
              const getTempValue = vaultTempValu[subIndex]
              vaultTempValu[subIndex] = null
              condition = false
  
              return getTempValue;
            }                
            //Проверка на последний элемент в главном массиве  arr
            if (mainIndex === lengthInputArr - 1){
              if (vaultTempValu[subIndex] !== null) {
                condition = false
                return vaultTempValu[subIndex];
              } else {
                condition = false
                return subEl;
              }
            }
            //Обход элементов ниже, пока-что не будет найдено число === или !== subEl. Или на конец массива
            while (mainIndex + counter < lengthInputArr && condition) {
              if (copyInputArr[mainIndex + counter][subIndex] > 0){
                if (copyInputArr[mainIndex + counter][subIndex] === subEl){
                  vaultTempValu[subIndex] = 0
                  condition = false
                  return subEl * 2;
                } else {
                  condition = false;
                  return subEl;
                }
              } else if(mainIndex + counter === lengthInputArr - 1){
                return subEl;
              }
              else {
                counter++;
              }}
          } else {
            return 0;
          }
      })
      return subArr;
    })
    
    if (direction === "down") {
      newArr.reverse()
      const sortedArr = sort.sortVertical(newArr, "down")
      return sortedArr;
    } else {
      const sortedArr = sort.sortVertical(newArr, "up")
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
          if (subIndex === el.length-1) {
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
          if (tempValue  === subEl) {
            let resultValue = subEl * 2;
            tempValue = null;
            return resultValue;
          }
          if (el[subIndex + 1] === 0) {
            tempValue = subEl ;
            return 0;
          }

          if (el[subIndex + 1] === subEl) {
            tempValue = subEl ;
            return 0;
          } else {
            return subEl;
          }
        }
        //Если 0 стоит в конце
        if (subIndex === el.length-1 ){
          return tempValue === null ? subEl : tempValue;
        }
        //Если
        if (el[subIndex + 1] > 0 ){
          if (el[subIndex + 1] === tempValue ){
            return 0
          }else {
            return tempValue === null ? subEl : tempValue;
          }
        } 
        else {
          return 0
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
      if(!localCondition){
        el.forEach(subEl => {
          subEl === 0 ? localCondition = true : localCondition = false;
        })
      } 
    })
    return localCondition
  }
}

