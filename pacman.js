/* Variables */

// Cookies
var countParties = 0;
var maxScore = 0;

// Puntuación
var score = 0;
var scoreText = document.getElementById("score");
var msg_container = document.getElementById("msg-container");
var msg_state = document.getElementById("msg-state");
var msg_score = document.getElementById("msg-score");
var msg_max_score = document.getElementById("msg-max_score");
const GAME_TIME = 180000;  // 50 minutos = 180000 segundos

// Objetos
var board = [];
var objectsRef = {
    0: " X ",  // pared
    1: "   ",  // camino
    2: "«■»",  // jugador
    3: " █ ",  // fantasmas
};
var player = {
    position: [0, 0],  // y - x
    last_position: [0, 0],
    direction: [0, 0],  // y - x
    image: new Image(),
    routine: undefined
};
var ghosts = [];

// Intervalos
var consoleInterval = undefined;
var canvasInterval = undefined;

// Canvas
var blockImg = new Image();
var floorImg = new Image();
var c = document.getElementById("pacman");
var ctx = c.getContext("2d");


/* Inicializa la aplicación */
function init() {
    loadCookies();
    initBoard();
    createBoardCanvas();
    initPlayer();
    initGhost();
    initializeEvents();
    //visualizeOnConsole();
    updateCanvas();
}

/* Recarga la página actual */
function restartGame() {
    location.reload();
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

/* Coge el valor de la cookie especificada */
function getCookie(cookieName) {
    var value = "";
    document.cookie.split("; ").filter((item) => {
        var itemArray = item.split("=");
        if (itemArray[0] == cookieName) {
            value = itemArray[1];
        }
    });
    return value;
}

/* Guarda el valor especificado en una cookie */
function setCookie(cookie_name, cookie_value) {
    var cookie_expire = new Date();
    cookie_expire.setFullYear(cookie_expire.getFullYear() + 1);  // Hace que la cookie expire en un año

    document.cookie = cookie_name + "=" + cookie_value + ";expires=" + cookie_expire;
}

/* Carga las cookies */
function loadCookies() {
    var cp = getCookie("countParties");
    var ms = getCookie("maxScore");

    countParties = (cp != "") ? parseInt(cp) : 0;
    maxScore = (ms != "") ? parseInt(ms) : 0;
}

/* Guarda las cookies */
function saveCookies(cp, ms) {
    setCookie("countParties", cp);
    setCookie("maxScore", ms);
}

/* Inicializa el tablero */
function initBoard() {
    // [y] = [x]
    board[0]  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    board[1]  = [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
    board[2]  = [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
    board[3]  = [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0];
    board[4]  = [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];
    board[5]  = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
    board[6]  = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
    board[7]  = [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0];
    board[8]  = [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0];
    board[9]  = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
    board[10]  = [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0];
    board[11]  = [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
    board[12]  = [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
    board[13]  = [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0];
    board[14]  = [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
    board[15]  = [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0];
    board[16]  = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    board[17]  = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    board[18]  = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    board[19]  = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    board[20]  = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
    board[21]  = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
    board[22]  = [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0];
    board[23]  = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
    board[24]  = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
    board[25]  = [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0];
    board[26]  = [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0];
    board[27]  = [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0];
    board[28]  = [0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0];
    board[29]  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Carga la imagen de bloques
    blockImg.onload = function() {
        createBoardCanvas();
    };
    blockImg.src = "img/block.png";

    // Carga la imagen del suelo
    floorImg.onload = function() {
        createFloorCanvas();
    };
    floorImg.src = "img/floor.png";
}

/* Inicializa al jugador */
function initPlayer() {
    var initialize = false;
    do {
        var x = Math.floor(Math.random() * (31 - 0)) + 0; 
        var y = Math.floor(Math.random() * (31 - 0)) + 0; 
        if (board[y] != undefined && board[y][x] != undefined) {
            if (board[y][x] == 1) {
                board[y][x] = 2;  // Especifica al jugador en la casilla seleccionada.
                player.position = [y, x];
                player.last_position = player.position;  // Indica la última posición en la que ha estado el jugador.
                player.routine = initPlayerRoutine();
                player.image.src = "img/player.png";
                initialize = true;
            }
        }
    } while (!initialize);
}

/* Inicializa a los fantasmas */
function initGhost() {
    for (var i = 0; i < 3; i++) {
        var initialize = false;
        do {
            var x = Math.floor(Math.random() * (31 - 0)) + 0; 
            var y = Math.floor(Math.random() * (31 - 0)) + 0; 
            if (board[y] != undefined && board[y][x] != undefined) {
                if (board[y][x] == 1) {
                    board[y][x] = 3;  // Especifica al fantasma en la casilla seleccionada.
                    ghosts.push({
                        position: [y, x],  // y - x
                        last_position: [y, x],
                        image: new Image(),
                        routine: initGhostRoutine(i)
                    });
                    ghosts[i].image.src = "img/ghost.png";
                    // ghosts[i].position = [y, x];
                    // ghosts[i].last_position = ghosts[i].position;
                    // ghosts[i].routine = initGhostRoutine(i);
                    initialize = true;
                }
            }
        } while (!initialize);
    }
}

/* Inicializa la rutina del personaje */
function initPlayerRoutine() {
    return setInterval(() => {
        var moved = false;
        var playerHasntMoved = (player.direction[0] == 0 && player.direction[1] == 0);
        do {
            var currentPosition = player.position;  // Posición actual del jugador
            // Genera random entre [-1 y 1]
            var randX = 0;
            var randY = 0;

            if (playerHasntMoved) {
                // El jugador todavía no ha apretado ninguna flecha de dirección, asi que se le
                // asignará una ruta aleatoria.
                randX = Math.floor(Math.random() * (2 - (-1))) + (-1);
                randY = Math.floor(Math.random() * (2 - (-1))) + (-1);
            }
            else {
                // El jugador ya ha apretado una flecha de dirección, por lo cual moverá él al personaje.
                randX = player.direction[1];
                randY = player.direction[0];
            }
            
            // Comprueba que la dirección sea horizontal o vertical
            if ((randX == 0 && randY == 1) || (randX == 1 && randY == 0) 
                || (randX == -1 && randY == 0) || (randX == 0 && randY == -1)) {
                // Le suma los valores aleatorios para crear la posición a la que se podrá mover el jugador
                var x = currentPosition[1] + randX;
                var y = currentPosition[0] + randY;

                if (board[y][x] == 1) {
                    // El jugador se mueve si hay camino y si es una dirección diferente de por donde ha venido
                    board[currentPosition[0]][currentPosition[1]] = 1;
                    board[y][x] = 2;
                    player.last_position = player.position;
                    player.position = [y, x];
                    moved = true;
                }
                else {
                    // Colisiona contra un fantasma
                    moved = true;  // Es necesario para que el bucle termine aunque el jugador ya haya perdido.
                }
            }
        } while (!moved);
    }, 400);  // 0,4 segundos
}

/* Inicializa la rutina del fantasma */
function initGhostRoutine(id_ghost) {
    return setInterval((id_ghost) => {
        var moved = false;
        do {
            var currentPosition = ghosts[id_ghost].position;  // Posición actual del fantasma en cuestión
            // Genera random entre [-1 y 1]
            var randX = Math.floor(Math.random() * (2 - (-1))) + (-1);
            var randY = Math.floor(Math.random() * (2 - (-1))) + (-1);
            
            // Comprueba que la dirección sea horizontal o vertical
            if ((randX == 0 && randY == 1) || (randX == 1 && randY == 0) 
                || (randX == -1 && randY == 0) || (randX == 0 && randY == -1)) {
                // Le suma los valores aleatorios para crear la posición a la que se podrá mover el fantasma
                var x = currentPosition[1] + randX;
                var y = currentPosition[0] + randY;

                if ((board[y][x] == 1 || board[y][x] == 3) && (y != ghosts[id_ghost].last_position[0] || x != ghosts[id_ghost].last_position[1])) {
                    // El fantasma se mueve si hay camino y si es una dirección diferente de por donde ha venido
                    board[currentPosition[0]][currentPosition[1]] = 1;
                    board[y][x] = 3;
                    ghosts[id_ghost].last_position = ghosts[id_ghost].position;
                    ghosts[id_ghost].position = [y, x];
                    moved = true;
                }
                else if (board[y][x] == 2) {
                    // Jugador derrotado
                    playerDefeated();
                    moved = true;
                }
            }
        } while (!moved);
    }, 400, id_ghost);  // 0,4 segundos
}

/* El jugador gana la partida */
function playerWin() {
    killIntervals();
    calculateScore(true);
}

/* El jugador pierde la partida */
function playerDefeated() {
    killIntervals();
    calculateScore(false);
}

/* Calcula la puntuación final */
function calculateScore(win) {
    var finalScore = (countParties * 60) + parseInt(score);
    countParties++;
    if (finalScore > maxScore) {
        // El jugador ha superado su record
        maxScore = finalScore;
    }
    saveCookies(countParties, maxScore);

    // Muestra el mensaje
    showMessage({
        class: (win) ? "victory" : "defeat",
        message: (win) ? "VICTORIA" : "DERROTA",
        score: "Puntuación actual: " + finalScore,
        max_score: "Mejor puntuación: " + maxScore
    });
}

/* Muestra el mensaje de victoria o derrota */
function showMessage(data) {
    msg_container.classList.remove("hide");
    msg_container.classList.add(data.class);
    msg_state.innerHTML = data.message;
    msg_score.innerHTML = data.score;
    msg_max_score.innerHTML = data.max_score;
}

/* Detiene todos los intervalos */
function killIntervals() {
    // Detiene el intervalo del jugador
    clearInterval(player.routine);
    player.routine = undefined;

    // Detiene el intervalo de los enemigos
    for (var i = 0; i < ghosts.length; i++) {
        clearInterval(ghosts[i].routine);
        ghosts[i].routine = undefined;
    }

    // Detiene el intervalo de actualizar el juego en la consola
    clearInterval(consoleInterval);
    consoleInterval = undefined;

    // Detiene el intervalo de actualizar el canvas
    clearInterval(canvasInterval);
    canvasInterval = undefined;
}

/* Inicializa los eventos del videojuego */
function initializeEvents() {
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 37:  // left
                player.direction = [0, -1];
                break;
            case 38:  // up
                player.direction = [-1, 0];  // Se ha invertido el valor, porque el canvas está en modo espejo...
                break;
            case 39:  // right
                player.direction = [0, 1];
                break;
            case 40:  // down
                player.direction = [1, 0];  // Se ha invertido el valor, porque el canvas está en modo espejo...
                break;
        }
    });
}

/* Crea los bloques en el canvas */
function createBoardCanvas() {
    for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[y].length; x++) {
            if (board[y][x] == 0) {
                ctx.drawImage(blockImg, x * 20, y * 20, 20, 20);
            }
        }
    }
}

/* Crea el suelo en el canvas */
function createFloorCanvas() {
    for (var y = board.length - 1; y >= 0; y--) {
        for (var x = 0; x < board[y].length; x++) {
            if (board[y][x] == 1) {
                ctx.drawImage(floorImg, x * 20, y * 20, 20, 20);
            }
        }
    }
}

/* Actualiza el canvas y el estado de la partida */
function updateCanvas() {
    canvasInterval = setInterval(() => {
        // Coge el 
        c.width = c.width;

        // Actualiza los bloques y el suelo
        createBoardCanvas();
        createFloorCanvas();

        // Actualiza al personaje y a los fantasmas
        ctx.drawImage(player.image, player.position[1] * 20, player.position[0] * 20, 20, 20);
        for (var i = 0; i < ghosts.length; i++) {
            ctx.drawImage(ghosts[i].image, ghosts[i].position[1] * 20, ghosts[i].position[0] * 20, 20, 20);
        }

        // Actualiza la puntuación
        updateScore();
    }, 200);  // 0,2 segundos
}

/* Actualiza la puntuación del jugador */
function updateScore() {
    // Actualiza la puntuación
    score += 0.2;
    scoreText.innerHTML = "Puntuación: " + parseInt(score);

    // Comprueba el tiempo restante
    if (score >= GAME_TIME) {
        // El jugador gana la partida
        playerWin();
    }
}

/* Visualiza el tablero en la consola */
function visualizeOnConsole() {
    consoleInterval = setInterval(() => {
        var result = "";
        for (var y = board.length - 1; y >= 0; y--) {
            for (var x = 0; x < board[y].length; x++) {
                result += objectsRef[board[y][x]];
            }
            result += "\n";
        }
        console.log(result);
    }, 200);  // 0,2 segundos
}

init();