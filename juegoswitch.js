const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Variables jugador 1
let vida1 = 100;
let mana1 = 50;
let quemado1 = 0;
let congelado1 = false;

// Variables jugador 2
let vida2 = 100;
let mana2 = 50;
let quemado2 = 0;
let congelado2 = false;

let turno = 1;

function mostrarEstado() {
    console.log("\n--- ESTADO ACTUAL ---");
    console.log("Jugador 1 -> Vida:", vida1, "Mana:", mana1);
    console.log("Jugador 2 -> Vida:", vida2, "Mana:", mana2);
    console.log("---------------------");
}

function aplicarEstados() {

    if (quemado1 > 0) {
        vida1 -= 5;
        quemado1--;
        console.log("Jugador 1 pierde 5 de vida por quemadura");
    }

    if (quemado2 > 0) {
        vida2 -= 5;
        quemado2--;
        console.log("Jugador 2 pierde 5 de vida por quemadura");
    }
}

function verificarGanador() {
    if (vida1 <= 0) {
        console.log("Jugador 2 gana!");
        rl.close();
        return true;
    }
    else if (vida2 <= 0) {
        console.log("Jugador 1 gana!");
        rl.close();
        return true;
    }
    return false;
}

function siguienteTurno() {

    aplicarEstados();

    if (verificarGanador()) return;

    mostrarEstado();

    if (turno === 1) {

        if (congelado1 === true) {
            console.log("❄ Jugador 1 está congelado y pierde turno");
            congelado1 = false;
            turno = 2;
            return siguienteTurno();
        }

        rl.question(
`Turno Jugador 1:
1) Bola de fuego (20 mana)
2) Rayo congelante (15 mana)
3) Meditar (+15 mana)
> `, function(opcion) {

            opcion = parseInt(opcion);

            switch(opcion) {

                case 1:
                    if (mana1 >= 20) {
                        mana1 -= 20;
                        let daño = random(18,25);
                        vida2 -= daño;
                        console.log("Jugador 2 recibe", daño);

                        if (random(1,100) <= 30) {
                            quemado2 = 2;
                            console.log("Jugador 2 queda quemado");
                        }
                    } else {
                        console.log("No tienes suficiente mana");
                    }
                    break;

                case 2:
                    if (mana1 >= 15) {
                        mana1 -= 15;
                        let daño = random(10,18);
                        vida2 -= daño;
                        console.log("Jugador 2 recibe", daño);

                        if (random(1,100) <= 30) {
                            congelado2 = true;
                            console.log("❄ Jugador 2 queda congelado");
                        }
                    } else {
                        console.log("No tienes suficiente mana");
                    }
                    break;

                case 3:
                    mana1 += 15;
                    console.log("Jugador 1 recupera mana");
                    break;

                default:
                    console.log("Opción inválida");
            }

            turno = 2;
            siguienteTurno();
        });

    } else {

        if (congelado2 === true) {
            console.log("❄ Jugador 2 está congelado y pierde turno");
            congelado2 = false;
            turno = 1;
            return siguienteTurno();
        }

        rl.question(
`Turno Jugador 2:
1) Bola de fuego (20 mana)
2) Rayo congelante (15 mana)
3) Meditar (+15 mana)
> `, function(opcion) {

            opcion = parseInt(opcion);

            switch(opcion) {

                case 1:
                    if (mana2 >= 20) {
                        mana2 -= 20;
                        let daño = random(18,25);
                        vida1 -= daño;
                        console.log("Jugador 1 recibe", daño);

                        if (random(1,100) <= 30) {
                            quemado1 = 2;
                            console.log("Jugador 1 queda quemado");
                        }
                    } else {
                        console.log("No tienes suficiente mana");
                    }
                    break;

                case 2:
                    if (mana2 >= 15) {
                        mana2 -= 15;
                        let daño = random(10,18);
                        vida1 -= daño;
                        console.log("Jugador 1 recibe", daño);

                        if (random(1,100) <= 30) {
                            congelado1 = true;
                            console.log("❄ Jugador 1 queda congelado");
                        }
                    } else {
                        console.log("No tienes suficiente mana");
                    }
                    break;

                case 3:
                    mana2 += 15;
                    console.log("Jugador 2 recupera mana");
                    break;

                default:
                    console.log("Opción inválida");
            }

            turno = 1;
            siguienteTurno();
        });
    }
}

console.log("DUELO DE MAGOS");
siguienteTurno();