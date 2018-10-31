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
    last_position: [0, 0]
};
var ghosts = [];
var consoleInterval = undefined;

/* Inicializa la aplicación */
function init() {
    initBoard();
    initPlayer();
    initGhost();
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
                        rutine: initGhostRutine(i)
                    });
                    // ghosts[i].position = [y, x];
                    // ghosts[i].last_position = ghosts[i].position;
                    // ghosts[i].rutine = initGhostRutine(i);
                    initialize = true;
                }
            }
        } while (!initialize);
    }
}

/* Inicializa la rutina del fantasma */
function initGhostRutine(id_ghost) {
    return setInterval((id_ghost) => {
        var moved = false;
        var triesToMove = 0;
        do {
            var currentPosition = ghosts[id_ghost].position;
            // Genera random entre [-1 y 1]
            var randX = Math.floor(Math.random() * (2 - (-1))) + (-1);
            var randY = Math.floor(Math.random() * (2 - (-1))) + (-1);
            
            // Comprueba que la dirección sea horizontal o vertical
            if ((randX == 0 && randY == 1) || (randX == 1 && randY == 0) 
                || (randX == -1 && randY == 0) || (randX == 0 && randY == -1)) {
                // Le suma los valores aleatorios para crear la posición a la que se podrá mover el fantasma
                var x = currentPosition[1] + randX;
                var y = currentPosition[0] + randY;

                if (board[y][x] == 1 && (y != ghosts[id_ghost].last_position[0] || x != ghosts[id_ghost].last_position[1])) {
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
                else if (board[y][x] == 3 && (y != ghosts[id_ghost].last_position[0] || x != ghosts[id_ghost].last_position[1])) {
                    // Si el fantasma choca contra otro fantasma se le dará hasta un máximo de 12 oportunidades
                    // para encontrar un nuevo camino. En caso de que no lo encuentre se le permitirá volver
                    // sobre sus pasos.
                    triesToMove++;
                    if (triesToMove < 12) {
                        ghosts[id_ghost].last_position = [y, x];
                    }
                }
            }
        } while (!moved);
    }, 400, id_ghost);  // 2 segundos
}

/* Detiene el juego cuando el jugador es derrotado */
function playerDefeated() {
    console.log("¡¡¡Jugador derrotado!!!");
    document.body.style.backgroundColor = "red";

    // Para el intervalo de los enemigos
    for (var i = 0; i < ghosts.length; i++) {
        clearInterval(ghosts[i].rutine);
        ghosts[i].rutine = undefined;
    }

    // Para el intervalo de actualizar el juego en la consola
    clearInterval(consoleInterval);
    consoleInterval = undefined;
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
    }, 200);
}

init();