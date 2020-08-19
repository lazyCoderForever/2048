import { CONSTS } from "./static_data.js";
export default class PlayField {
  constructor() {
    this.arrVault = CONSTS.DEFAULT_PLAYFIELD;
    this.score = 0;
  }

  CreatePlayField() {
    let score = document.querySelector("#score");
    score.innerText = `${this.score}`

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

  UpdatePlayField(direction) {
    let counter = 0,
      score = document.querySelector("#score"),
      nodes = playfield.querySelectorAll("div");
    document.documentElement.style.setProperty("--x", "0px");
    document.documentElement.style.setProperty("--y", "0px");

    this.arrVault.forEach((mainEl) => {
      mainEl.forEach((subEl, subIndex) => {
        let currentCell = nodes[counter],
          currentCellLastClass = currentCell.className.slice(7);
        if (subEl !== 0) {
          if (currentCell.classList.contains("thing")) {
            document.documentElement.style.setProperty("--y", `0px`);
            document.documentElement.style.setProperty("--x", `0px`);
          } else {
            switch (direction) {
              case "right":
                document.documentElement.style.setProperty(
                  "--x",
                  `${subIndex / -30}px`
                );
                break;
              case "left":
                document.documentElement.style.setProperty(
                  "--x",
                  `${subIndex * 30}px`
                );
                break;
              case "up":
                document.documentElement.style.setProperty(
                  "--y",
                  `${subIndex * 30}px`
                );
                break;
              case "down":
                document.documentElement.style.setProperty(
                  "--y",
                  `${subIndex * -30}px`
                );
                break;
            }
          }
          if (subEl !== +currentCellLastClass) {
            currentCell.classList.remove(
              "thing",
              "back",
              `t${currentCellLastClass}`
            );
            setTimeout(
              () => {
                currentCell.classList.add("thing", `t${subEl}`);
              },
              40,
              currentCell,
              subEl
            );
          }
        } else {
          if (!currentCell.classList.contains("back")) {
            currentCell.classList.remove("thing", `t${currentCellLastClass}`);
            setTimeout(
              () => {
                currentCell.classList.add("back");
              },
              40,
              currentCell,
              subEl
            );
          }
        }

        counter++;
      });
    });
    score.innerText = `${this.score}`;
  }
}
