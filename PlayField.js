export default class PlayField {
  constructor() {
    this.arrVault = [
      [2, 4, 4, 8],
      [16, 256, 256, 0],
      [64, 16, 32, 4],
      [32, 128, 128, 0],
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
