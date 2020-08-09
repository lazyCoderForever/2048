function compareArr(a, b){
    if (a===0 && b===0){
      return 0
    }
    else if (a === 0){
      return -1
    } 
    else if( b === 0){
      return 1
    } else {
      return 0
    }
}


export {compareArr}