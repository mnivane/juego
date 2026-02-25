const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let puntaje = 0;
let preguntaNumero = 1;

// Banco de preguntas
const preguntas = [
    {
        pregunta: "¿Cuál es el planeta más grande del sistema solar?",
        opciones: "A) Marte\nB) Júpiter\nC) Saturno",
        correcta: "B"
    },
    {
        pregunta: "¿Cuántos huesos tiene el cuerpo humano adulto?",
        opciones: "A) 206\nB) 150\nC) 300",
        correcta: "A"
    },
    {
        pregunta: "¿Cuánto es 7 x 9?",
        opciones: "A) 56\nB) 63\nC) 72",
        correcta: "B"
    },
    {
        pregunta: "¿Cuál es el animal más rápido del mundo en tierra?",
        opciones: "A) León\nB) Tigre\nC) Guepardo",
        correcta: "C"
    },
    {
        pregunta: "¿Qué órgano bombea la sangre?",
        opciones: "A) Pulmón\nB) Corazón\nC) Hígado",
        correcta: "B"
    },
    {
        pregunta: "¿Cuál es el océano más grande?",
        opciones: "A) Atlántico\nB) Índico\nC) Pacífico",
        correcta: "C"
    },
    {
        pregunta: "¿Qué gas respiramos principalmente?",
        opciones: "A) Oxígeno\nB) Hidrógeno\nC) Dióxido de carbono",
        correcta: "A"
    },
    {
        pregunta: "¿En qué continente está Egipto?",
        opciones: "A) África\nB) Asia\nC) Europa",
        correcta: "A"
    },
    {
        pregunta: "¿Cuántos lados tiene un hexágono?",
        opciones: "A) 5\nB) 6\nC) 8",
        correcta: "B"
    },
    {
        pregunta: "¿Cuál es el resultado de 15 ÷ 3?",
        opciones: "A) 3\nB) 4\nC) 5",
        correcta: "C"
    }
];

// Mezclar preguntas aleatoriamente
preguntas.sort(() => Math.random() - 0.5);

// Tomar solo 8 preguntas
const preguntasSeleccionadas = preguntas.slice(0, 8);

function hacerPregunta() {

    if (preguntaNumero <= 8) {

        let actual = preguntasSeleccionadas[preguntaNumero - 1];

        rl.question(
            `\nPregunta ${preguntaNumero}:\n${actual.pregunta}\n${actual.opciones}\n> `,
            function(respuesta) {

                if (respuesta.toUpperCase() === actual.correcta) {
                    console.log("Correcto!");
                    puntaje++;
                } else {
                    console.log("Incorrecto. :(");
                    console.log("La respuesta correcta era:", actual.correcta);
                }

                preguntaNumero++;
                hacerPregunta();
            }
        );

    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {

    console.log("\nQUIZ TERMINADO");
    console.log("Tu puntaje fue:", puntaje, "/ 8");

    if (puntaje === 8) {
        console.log("Excelente, puntuación perfecta!");
    }
    else if (puntaje >= 5) {
        console.log("Muy buen trabajo!");
    }
    else {
        console.log("Puedes mejorar, sigue practicando.");
    }

    rl.close();
}

console.log("QUIZ ALEATORIO DE CONOCIMIENTOS");
hacerPregunta();