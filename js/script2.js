//Utilisation de ce tutoriel : https://devenezdeveloppeur.fr/jeu-snake-javascript/

const canvas = document.getElementById("jeu");
const ctx = canvas.getContext("2d");

const CASE = 20;
const COLONNES = canvas.width / CASE;
const LIGNES = canvas.height / CASE;

let serpent, direction, prochaineDirection, pomme, score, boucle;

function nouvellePartie() {
    serpent = [
          { x: 10, y: 10 },
          { x: 9, y: 10 },
          { x: 8, y: 10 },
    ];
    direction = { x: 1, y: 0 };
    prochaineDirection = direction;
    score = 0;
    //On définit les coordonnées de la nouvelle pomme (aléatoirement)
    pomme = nouvellePomme();
    document.getElementById("score").textContent = "Score : 0";
    document.getElementById("rejouer").hidden = true;
    clearInterval(boucle);
    //Toutes les 120 ms on va relancer la fonction tour
    boucle = setInterval(tour, 120);
}

function nouvellePomme() {
    let p;
    do {
        p = {
            x: Math.floor(Math.random() * COLONNES),
            y: Math.floor(Math.random() * LIGNES),
        };
    } while (serpent.some((c) => c.x === p.x && c.y === p.y));
        return p;
    }

    function tour() {
        direction = prochaineDirection;
        const tete = {
            x: serpent[0].x + direction.x,
            y: serpent[0].y + direction.y,
        };

        if (tete.x < 0 || tete.x >= COLONNES || tete.y < 0 || tete.y >= LIGNES) {
            return finDePartie();
        }
        // on ignore la dernière case : la queue la libère pendant ce tour
        if (serpent.slice(0, -1).some((c) => c.x === tete.x && c.y === tete.y)) {
            return finDePartie();
        }

        serpent.unshift(tete);

        if (tete.x === pomme.x && tete.y === pomme.y) {
            score += 1;
            document.getElementById("score").textContent = "Score : " + score;
            pomme = nouvellePomme();
        } else {
            serpent.pop();
        }

        dessiner();
    }

    function dessiner() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#c0392b";
        ctx.fillRect(pomme.x * CASE, pomme.y * CASE, CASE, CASE);

        ctx.fillStyle = "#27ae60";
        for (const c of serpent) {
            ctx.fillRect(c.x * CASE, c.y * CASE, CASE - 1, CASE - 1);
        }
    }

    function finDePartie() {
        clearInterval(boucle);
        document.getElementById("rejouer").hidden = false;
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.font = "28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Perdu ! Score : " + score, canvas.width / 2, canvas.height / 2);
    }

    document.addEventListener("keydown", (e) => {
        const touches = {
          ArrowUp: { x: 0, y: -1 },
          ArrowDown: { x: 0, y: 1 },
          ArrowLeft: { x: -1, y: 0 },
          ArrowRight: { x: 1, y: 0 },
        };
        const d = touches[e.key];
        if (!d) return;
        e.preventDefault();
        if (d.x === -direction.x && d.y === -direction.y) return;
        prochaineDirection = d;
    });

    document.getElementById("rejouer").addEventListener("click", nouvellePartie);

    nouvellePartie();