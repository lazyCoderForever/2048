export default class PlayField {
  constructor() {
    this.arrVault = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }

  createField() {
    this.arrVault.forEach((el) => {
      el.forEach((subElem) => {
        let node = document.createElement("div");

        if (subElem === 0) {
          node.classList.add("back");
        } else {
          node.classList.add("thing", `t${subElem}`);
        }
        playfield.appendChild(node);
      });
    });
  }
}
