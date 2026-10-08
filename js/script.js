const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const restartButton = document.getElementById("restart");

let score = 0;

let gameOver = false;

//On définit l'emplacement de base du serpent
let snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
];

//On définit l'emplacement de base de la nourriture
let food = {
    x: 100,
    y: 100
};

//On choisit la direction de base
let direction = "RIGHT";

//On dessine le serpent
drawSnake();

//On ajoute un évènement sur le bouton restart
restartButton.addEventListener("click", function() {

    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];

    direction = "RIGHT";

    score = 0;

    gameOver = false;

    document.getElementById("score").textContent = score;

    generateFood();

    draw();

});

//On ajoute un évènement sur les touches du clavier, pour changer la direction du serpent
document.addEventListener("keydown", function(event) {

    //On rajoute une sécurité pour éviter le bug si on veut faire revenir le serpent sur lui même ! 
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }

    if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }

    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }

});

//Toutes les 150 ms, on appelle la fonction qui fait bouger le serpent puis celle qui l'affiche
setInterval(function () {

    //Si la partie n'est pas finie
    if (!gameOver) {

        moveSnake();
        draw();

    }

}, 150);


//Fonction qui efface l'ancien dessin et appelle la fonction pour dessiner le nouveau serpent et la nourriture
function draw() {

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    //On dessine le serpent
    drawSnake();
    //On dessine la nourriture
    drawFood();

    if (gameOver) {
        context.fillStyle = "black";
        context.font = "30px Arial";
        context.fillText(
            "GAME OVER",
            120,
            200
        );
    }
}

//Fonction qui dessine la nourriture
function drawFood() {

    context.fillStyle = "red";

    context.fillRect(
        food.x,
        food.y,
        20,
        20
    );
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

    //Si le serpent se cogne au mur ou sur lui même la partie est terminée.
    if (
        checkWallCollision(newHead) ||
        checkSelfCollision(newHead)
    ) {
        gameOver = true;
        return;
    }

    //On ajoute la nouvelle tête en haut du tableau (donc agrandit le serpent)
    snake.unshift(newHead); 
    
    //Si les coordonnées de la nouvelle tête correspondent à celle de la nourriture, on génère une nouvelle nourriture 
    //On ne retire pas la dernière case du serpent
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        generateFood();

    } else {

        //On supprime la dernière case du serpent : Supprime le dernier élément du tableau
        snake.pop(); 
    }

}

//Fonction qui génère de façon aléatoire la nourriture
function generateFood() {

    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
}

//Pour gérer les collisions avec les murs
//Retourne true si il cogne un mur, false sinon
function checkWallCollision(head) {

    return (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    );
}

//Pour gérer les collisions avec lui même
//Retourne true si il se cogne lui même, false sinon
function checkSelfCollision(head) {

    for (let i = 1; i < snake.length; i++) {

        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {
            return true;
        }
    }

    return false;
}