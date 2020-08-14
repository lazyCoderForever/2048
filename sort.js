export default class Sort{

    sortVertical(arr, direction){
      let counter , tempArr,
      inputArrayLength = arr.length,
      firstRowArr = arr.slice(0,1)[0],
      resultArr = [...arr];

      firstRowArr.forEach((el,index)=>{
          counter = 0;
          tempArr = [];

            while (counter < inputArrayLength){

              tempArr.push(arr[counter][index]);
              counter ++
          }

          direction === 'down' ? 
          tempArr.sort((a,b) => this.sortToRight(a,b)) : 
          tempArr.sort((a,b) => this.sortToLeft(a,b));
          
          tempArr.forEach((sortEl, indexT) => {
            resultArr[indexT][index] = sortEl
          })

  
      });
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




