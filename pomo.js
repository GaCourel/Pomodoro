let segundos = 1500, tempo = 1500, counter = 0;
let shortRest = Math.floor(tempo / 5), longRest = Math.floor(tempo * (3 / 5));
let tempoFoco = false, cronometro = false;
let timer;

function segundosParaTempo ()
{
    const zeroEsquerda = (n) => Math.floor(n).toString().padStart(2, '0');
    const min = zeroEsquerda (segundos / 60); 
    const s = zeroEsquerda (segundos % 60);
    return  `${min}:${s}`;
}

function atualizarTempo() {
    const tempoInput = document.querySelector("#segundos").textContent;
    const [minutos, segundosInput] = tempoInput.split(":").map(num => parseInt(num));
    
    // Verificar se a entrada tem formato válido de tempo MM:SS
    if (!isNaN(minutos) && !isNaN(segundosInput) && minutos >= 0 && segundosInput >= 0 && segundosInput < 60) {
        segundos = minutos * 60 + segundosInput;
        tempo = segundos;
        shortRest = Math.floor(tempo / 5);
        longRest = Math.floor(tempo * (3 / 5));
        atualizarDisplay();
    } else {
        // Caso o formato seja inválido, mantemos o tempo original
        alert("Formato inválido. Use MM:SS.");
    }
}

function atualizarDisplay() // Atualiza o conteúdo do elemento HTML 
{
    document.querySelector("#segundos").textContent = segundosParaTempo ();
}

function passaTempo ()
{
    if (segundos >= 0 && tempoFoco)
    {
        segundos--;
        atualizarDisplay ();

        if (segundos == 0)
        {
            tempoFoco = false;
            counter++;
            //som de alarme

            if (counter % 5 != 0)
            {
                segundos = shortRest;
                atualizarDisplay ();    
            }
            else if (counter % 5 == 0)
            {
                segundos = longRest;
                atualizarDisplay ();
            }
            alterarModo ();
        }
    }
    else if (segundos >= 0 && !tempoFoco)
    {
        segundos--;
        atualizarDisplay ();

        if (segundos == 0)
        {
            tempoFoco = true;
            //som de alarme
            segundos = tempo;
            atualizarDisplay ();
        }
        alterarModo ();
    }
    
}

function play_pause()   // Para o timer
{
    
    if (segundos == tempo)
    {
        tempoFoco = true;
        alterarModo();
    }

    if (!cronometro)
    {
        timer = setInterval (passaTempo, 1000);
        cronometro = true;
    }
    else
    {
        clearInterval (timer);
        cronometro = false;
    } 
    document.querySelector("#botaoplay").textContent = cronometro ? "Pause" : "Play";
}

function resetTimer ()
{
    atualizarDisplay ();
    if (cronometro)
    {
        clearInterval (timer);
        cronometro = false;
    }
}

function foco ()
{
    segundos = tempo;
    resetTimer ();
    tempoFoco = true;
    alterarModo ();
}

function descansoCurto ()
{
    segundos = shortRest;
    resetTimer ();
    tempoFoco = false;
    alterarModo ();
}

function descansoLongo ()
{
    segundos = longRest;
    resetTimer ();
    tempoFoco = false;
    alterarModo ();
}

/* alteração do CSS modo de foco */
function alterarModo ()
{
    const body = document.body;
    const pomodoro = document.querySelector('.pomodoro');
    const botoes = document.querySelectorAll('button');

    if (tempoFoco)
    {
        body.classList.add('backgroundFoco');
        pomodoro.classList.add('pomodoroColor');
        botoes.forEach(button => button.classList.add('buttonColor'));
    }
    else
    {
        body.classList.remove('backgroundFoco');
        pomodoro.classList.remove('pomodoroColor');
        botoes.forEach(button => button.classList.remove('buttonColor'));
    }
}
/* alteração do CSS modo de foco */
