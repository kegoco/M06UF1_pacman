/* Variables */
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
    routine: undefined
};
var ghosts = [];
var consoleInterval = undefined;

/* Inicializa la aplicación */
function init() {
    initBoard();
    initPlayer();
    initGhost();
    initializeEvents();
    visualizeOnConsole();
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
                        routine: initGhostRoutine(i)
                    });
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

/* Detiene el juego cuando el jugador es derrotado */
function playerDefeated() {
    console.log("¡¡¡Jugador derrotado!!!");
    document.body.style.backgroundColor = "red";

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
}

function initializeEvents() {
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 37:  // left
                player.direction = [0, -1];
                break;
            case 38:  // up
                player.direction = [1, 0];
                break;
            case 39:  // right
                player.direction = [0, 1];
                break;
            case 40:  // down
                player.direction = [-1, 0];
                break;
        }
    });
}

/* Visualiza el tablero en la consola */
function visualizeOnConsole() {
    consoleInterval = setInterval(() => {
        var container = document.getElementById("container");
        var result = "";
        for (var y = board.length - 1; y >= 0; y--) {
            for (var x = 0; x < board[y].length; x++) {
                result += objectsRef[board[y][x]];  //(board[y][x] == 0) ? " X " : "   ";
            }
            result += "\n";
        }
        console.log(result);
    }, 200);  // 0,2 segundos
}

init();