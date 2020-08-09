  export default  class PlayField {
    constructor() {
      this.arrVault = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    createField() {
      let listNodes = this.arrVault.map((el) => {
        let node = document.createElement("div");

        if (el <= 0) {
          node.classList.add("back");
        } else {
          node.classList.add("thing", `t${el}`);
        }
        return node;
      });
      listNodes.forEach((el) => playfield.appendChild(el));
    }


  }




