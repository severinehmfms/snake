const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

let snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
];

//On choisit la direction
let direction = "RIGHT";

//On dessine le serpent
drawSnake();



//On ajoute un évènement sur les touches du clavier, pour changer la direction du serpent
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp") {
        direction = "UP";
    }

    if (event.key === "ArrowDown") {
        direction = "DOWN";
    }

    if (event.key === "ArrowLeft") {
        direction = "LEFT";
    }

    if (event.key === "ArrowRight") {
        direction = "RIGHT";
    }

});

//Toutes les 150 ms, on appelle la fonction qui fait bouger le serpent puis celle qui l'affiche
setInterval(function () {

    moveSnake();

    draw();

}, 150);


//Fonction qui efface l'ancien dessin et appelle la fonction pour dessiner le nouveau serpent
function draw() {

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawSnake();
}

//Fonction qui dessine le serpent
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

//Fonction qui déplace le serpent
function moveSnake() {

    let head = snake[0];

    let newHead = {
        x: head.x,
        y: head.y
    };

    if (direction === "RIGHT") {
        newHead.x += 20;
    }

    if (direction === "LEFT") {
        newHead.x -= 20;
    }

    if (direction === "UP") {
        newHead.y -= 20;
    }

    if (direction === "DOWN") {
        newHead.y += 20;
    }

    snake.unshift(newHead); //Ajoute la nouvelle tête en haut du tableau
    snake.pop(); //Supprime le dernier élément du tableau
}

