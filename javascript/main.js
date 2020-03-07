let gameArea = document.getElementById("game");
// ---
let tileMap = new TileMap(50, 50);
tileMap.buildMap();
// ---
let pause = false;
let playBut = false;

document.getElementById("play").addEventListener("click", ()=>{
    if (!playBut){
        play();
        playBut = true;
        document.getElementById("play").innerHTML = "pause";
    } else if (playBut) {
        if (pause) {
            document.getElementById("play").innerHTML = "pause";
        } else {
            document.getElementById("play").innerText = "play";
        }
        pause = !pause;
    }
});
document.getElementById("step").addEventListener("click", ()=>{
    tileMap.update();
});

function play() {
    let inter = setInterval(()=> {
        if (!pause) {
            tileMap.update();
        }
    }, 200);
}
