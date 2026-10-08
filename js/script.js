const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

let snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
];

drawSnake();



function drawSnake() {

    context.fillStyle = "green";

    for (let part of snake) {

        context.fillRect(
            part.x,
            part.y,
            20,
            20
        );
    }
}