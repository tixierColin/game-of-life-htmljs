class TileMap {
    constructor(height, width) {
        this.map = [];
        this.currentGen = [];
        this.newGen = [];
        this.template = [];
        this.cells = [];
        this.height = height;
        this.width = width;
    }
    buildMap() {
        for (let y = 0; y < this.height; y++) {
            let tr = document.createElement("tr");
            gameArea.appendChild(tr);
            this.map.push([]);
            this.currentGen.push([]);
            for (let x = 0; x < this.height; x++) {
                let td = document.createElement("td");
                td.setAttribute("onclick", "tileMap.newCell({x:" + x + ", y:" + y + "})");
                tr.appendChild(td);
                this.map[y].push(td);
                this.currentGen[y].push("white");
            }
        }
        this.template = this.currentGen;
        this.newGen = this.currentGen;
    }
    newCell(pos) { //pos {x: int, y: int}
        if (this.map[pos.y][pos.x].style.backgroundColor == "black") {
            this.map[pos.y][pos.x].style.backgroundColor = "white";
            this.currentGen[pos.y][pos.x] = "white"
        } else {
            this.map[pos.y][pos.x].style.backgroundColor = "black";
            this.currentGen[pos.y][pos.x] = "black"
        }
    }
    update() {
        for (let y in this.map) {
            for (let x in this.map[y]) {
                let living = (this.currentGen[y][x] == "black") ? true : false;
                let count = this.getLinvingNearCells({x: parseInt(x), y: parseInt(y)});
                
                if (living && count < 2) {
                    this.newGen[y][x] = "white";
                }
                if (living && (count == 2 || count == 3)) {
                    this.newGen[y][x] = "black";
                }
                if (living && count > 3) {
                    this.newGen[y][x] = "white";
                }
                if (!living && count == 3) {
                    this.newGen[y][x] = "black";
                }
            }
        }
        this.currentGen = this.newGen;
        this.newGen = this.template;
        for(let y in this.currentGen) {
            for (let x in this.currentGen[y]) {
                if (this.currentGen[y][x] == "black") {
                    this.map[y][x].style.backgroundColor = "black";
                } else {
                    this.map[y][x].style.backgroundColor = "white";
                }
            }
        }
    }
    getLinvingNearCells(pos) {
        let map = this.map;
        let living = 0;
        // right
        if (this.width - 1 != pos.x) {
            if (this.map[pos.y][pos.x + 1].style.backgroundColor == "black") {
                living ++;
            }
        }
        // left
        if (0 != pos.x) {
            if (this.map[pos.y][pos.x - 1].style.backgroundColor == "black") {
                living ++;
            }
        }
        // top
        if (0 != pos.y) {
            if (this.map[pos.y - 1][pos.x].style.backgroundColor == "black") {
              living ++;
            }
        }
        // top right
        if (0 != pos.y && this.width - 1 != pos.x) {
            if (this.map[pos.y - 1][pos.x + 1].style.backgroundColor == "black") {
                living ++;
            }
        }
        // top left
        if (0 != pos.y && 0 != pos.x) {
            if (this.map[pos.y - 1][pos.x - 1].style.backgroundColor == "black") {
                living ++;
            }
        }
        // bottom
        if (this.height - 1 != pos.y) {
            if (this.map[pos.y + 1][pos.x].style.backgroundColor == "black") {
                living ++;
            }
        }
        // bottom right
        if (this.height - 1 != pos.y && this.width - 1 != pos.x) {
            if (this.map[pos.y + 1][pos.x + 1].style.backgroundColor == "black") {
                living ++;
            }
        }
        // bottom left
        if (this.height - 1 != pos.y && 0 != pos.x) {
            if (this.map[pos.y + 1][pos.x - 1].style.backgroundColor == "black") {
                living ++;
            }
        }
        return living;
    }
}