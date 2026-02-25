const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función que SIEMPRE genera número aleatorio del 1 al 10
function numeroAleatorio() {
    return Math.floor(Math.random() * 10) + 1;
}

let jugador = 0;
let dealer = 0;
let ronda = 1;

console.log("BLACKJACK");
console.log("Números aleatorios del 1 al 10\n");

// Función para mostrar marcador
function mostrarEstado() {
    console.log("---------");
    console.log("Jugador:", jugador);
    console.log("Dealer:", dealer);
    console.log("---------\n");
}

// Rondas automáticas hasta la 3
function rondasIniciales() {

    while (ronda <= 3) {
        let cartaJugador = numeroAleatorio();
        let cartaDealer = numeroAleatorio();

        jugador += cartaJugador;
        dealer += cartaDealer;

        console.log(`Ronda ${ronda}`);
        console.log(`Jugador sacó: ${cartaJugador}`);
        console.log(`Dealer sacó: ${cartaDealer}`);
        mostrarEstado();

        ronda++;
    }

    decisionJugador();
}

// A partir de la ronda 3 decides tú
function decisionJugador() {

    if (jugador > 21) {
        console.log("Te pasaste de 21. Pierdes.");
        rl.close();
        return;
    }

    rl.question("¿Quieres seguir o plantarte? (seguir/plantarse): ", function(respuesta) {

        if (respuesta.toLowerCase() === "seguir") {

            let cartaJugador = numeroAleatorio();
            let cartaDealer = numeroAleatorio();

            jugador += cartaJugador;
            dealer += cartaDealer;

            console.log("\nNueva ronda:");
            console.log(`Jugador sacó: ${cartaJugador}`);
            console.log(`Dealer sacó: ${cartaDealer}`);
            mostrarEstado();

            decisionJugador();

        } else {
            turnoDealer();
        }
    });
}

// Dealer juega solo si tú te plantas
function turnoDealer() {

    console.log("\n Turno final del dealer...\n");

    while (dealer < 17) {
        let cartaDealer = numeroAleatorio();
        dealer += cartaDealer;
        console.log(`Dealer sacó: ${cartaDealer}`);
    }

    mostrarEstado();
    resultadoFinal();
}

function resultadoFinal() {

    console.log("RESULTADO FINAL");

    if (jugador > 21) {
        console.log("Perdiste.");
    }
    else if (dealer > 21) {
        console.log("El dealer se pasó. ¡Ganaste!");
    }
    else if (jugador > dealer) {
        console.log("¡Ganaste!");
    }
    else if (jugador < dealer) {
        console.log("Perdiste.");
    }
    else {
        console.log("Empate.");
    }

    rl.close();
}

// Iniciar juego
rondasIniciales();