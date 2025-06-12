let segundos = 1500, tempo = 1500, counter = 0;
let shortRest = Math.floor(tempo / 5), longRest = Math.floor(tempo * (3 / 5));
let tempoFoco = true, cronometro = false;
let timer;

function segundosParaTempo ()
{
    const zeroEsquerda = (n) => Math.floor(n).toString().padStart(2, '0');
    const min = zeroEsquerda (segundos / 60); 
    const s = zeroEsquerda (segundos % 60);
    return  `${min}:${s}`;
}

function atualizarDisplay() // Atualiza o conteúdo do elemento HTML 
{
    document.querySelector("#segundos").textContent = segundosParaTempo ();
}

function personalizar ()
{
    const novovalor = Number(document.querySelector("#personalizado").value);
    segundos = novovalor;
    tempo = novovalor;
    shortRest = Math.floor(tempo / 5);
    longRest = Math.floor(tempo * (3 / 5));
    atualizarDisplay();
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
    }
    
}

function play_pause()   // Para o timer
{
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
}

function descansoCurto ()
{
    segundos = shortRest;
    cronometro = false;
    resetTimer ();
}

function descansoLongo ()
{
    segundos = longRest;
    cronometro = false;
    resetTimer ();
}

