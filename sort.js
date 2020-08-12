export default class Sort{

    sortVertical(arr, direction){
    let counter ,
    tempArr ,
    firstRowArr = arr.slice(0,1),
    resultArr = [...arr];
      firstRowArr.forEach((el,index)=>{
         el.forEach((el,subIndx)=>{
          counter = 0;
          tempArr = [];
            while (counter < arr.length){
              tempArr.push(arr[index][subIndx]);
              counter ++
              
          }
          direction === 'down' ? 
          tempArr.sort((a,b) => this.sortToRight(a,b)) : 
          tempArr.sort((a,b) => this.sortToLeft(a,b));
          
          tempArr.forEach((el, indexT) => {
            resultArr[indexT][subIndx] = el
          })
        })
  
      })
      return resultArr
  
  }

 sortToRight(a, b){
    if (a===0 && b===0){
      return 0
    }
    else if (a === 0){
      return -1
    } 
    else if( b === 0){
      return 1
    } else if(a !== 0 && b !== 0){
      return 0
    }
}

 sortToLeft(a, b){
  if (a !== 0 && b !== 0){
    return 0
  }
  else {
  return b-a;
  }
}
} 




