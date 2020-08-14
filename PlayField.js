import { CONSTS } from "./static_data.js";
export default class PlayField {
  constructor() {
    this.arrVault = CONSTS.DEFAULT_PLAYFIELD
  }

  CreatePlayField() {
    this.arrVault.forEach((el) => {
      el.forEach((subElem) => {
        let node = document.createElement("div")

        if (subElem === 0) {
          node.classList.add("back");
        } else {
          node.classList.add("thing", `t${subElem}`)
        }
        playfield.appendChild(node)
      })
    })
  }

  UpdatePlayField(){
    const regex = /t\d/g;
    let counter = 0;
    this.arrVault.forEach((el) => {
      el.forEach(() => {
        let node = playfield.getElementsByClassName("thing")
        let tt = node[0].className.search(regex);
        let dd = node[0].className.slice(tt);
        setTimeout(() => {
          node[counter].classList.remove(dd)
           //playfield.removeChild(node[0]);
        }, 200);
        counter++
      })

    })

  }
}
