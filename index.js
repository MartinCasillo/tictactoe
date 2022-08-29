window.addEventListener("DOMContentLoaded",() => {

    const cuadros = Array.from(document.querySelectorAll(".cuadro"));
    const jugadorDisplay = document.querySelector(".display-jugador");
    const recomponerButton = document.querySelector(".recomponer");
    const anunciador = document.querySelector(".anunciador")

    let tablero = ["","","","","","","","",""];

    // tablero 
    // [0][1][2]
    // [3][4][5]
    // [6][7][8]

    let actualJugador = "X";
    let juegoActivo = true;
    const jugadorX_GANO = "jugadorX_GANO"
    const jugadorO_GANO = "jugadorO_GANO"

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    function validarResultado(){
        let juegoGanado = false;
        for ( let i = 0; i <= 7; i++){
            const winCondition = winningConditions[i];
            const a = tablero[winCondition[0]];
            const b = tablero[winCondition[1]];
            const c = tablero[winCondition[2]];
            
            if ( a === ""  || b === "" || c === "" ){
                continue;
            }
            if (a === b && b === c){
                juegoGanado = true;
                break
            }
        }
        if(juegoGanado){
            anunciar(actualJugador === "X" ? jugadorX_GANO : jugadorO_GANO)
            juegoActivo = false;
            return;   
        
        }
        // if (!tablero.includes("")){
        //     anunciar(EMPATE)
        // }
    }
    function accionValida(cuadro){
        if(cuadro.innerText === "X" || cuadro.innerText === "O"){
            return false;
        }
        return true
    }
    function actualizarTablero(index){
        tablero[index] = actualJugador;
    }
    function anunciar(type){
        switch(type){
            case jugadorO_GANO:
                anunciador.innerHTML = 'jugador <span class="jugadorO">O</span> GANO';
                break; 
            case jugadorX_GANO:
                anunciador.innerHTML = 'jugador <span class="jugadorX">X</span> GANO';
                break; 
            // case EMPATE:
            //     anunciador.innerHTML = 'EMPATE';
        }
        anunciador.classList.remove("hide")
    }
    function cambiarJugador(){
        jugadorDisplay.classList.remove(`jugador${actualJugador}`);
        actualJugador = actualJugador === "X" ? "O" : "X" ;
        jugadorDisplay.innerText = actualJugador;
        jugadorDisplay.classList.add(`jugador${actualJugador}`);

    }
    function accion(cuadro,index){
        if(accionValida(cuadro) && juegoActivo){
            cuadro.innerText = actualJugador;
            cuadro.classList.add(`jugador${actualJugador}`)
            actualizarTablero(index);
            validarResultado();
            cambiarJugador();

        }
    }
    function recomponerTablero(){
        tablero = ["","","","","","","","",""];
        juegoActivo = true;
        anunciador.classList.add("hide");
        if (actualJugador === "O"){
            cambiarJugador();
        }
        cuadros.forEach(cuadro => {
            cuadro.innerText = "";
            cuadro.classList.remove("jugadorX");
            cuadro.classList.remove("jugadorO");
        })
    }
    cuadros.forEach ((cuadro,index) => {
        cuadro.addEventListener ("click", () => accion(cuadro,index));
    })
    recomponerButton.addEventListener("click",recomponerTablero);
})