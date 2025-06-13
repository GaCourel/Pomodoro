let segundos = 1500, tempo = 1500, counterp = 0, counterc = 0, xfoco = 0;
let shortRest = Math.floor(tempo / 5), longRest = Math.floor(tempo * (3 / 5));
let tempoFoco = false, cronometro = false;
let timer;

function segundosParaTempo (param)
{
    const zeroEsquerda = (n) => Math.floor(n).toString().padStart(2, '0');
    const min = zeroEsquerda (param / 60); 
    const s = zeroEsquerda (param % 60);
    return  `${min}:${s}`;
}

function atualizarTempo() {
    const tempoInput = document.querySelector("#segundos").textContent;
    const [minutos, segundosInput] = tempoInput.split(":").map(num => parseInt(num));
    
    // Verificar se a entrada tem formato válido de tempo MM:SS
    if (!isNaN(minutos) && !isNaN(segundosInput) && minutos >= 0 && segundosInput >= 0 && segundosInput < 60 && minutos <= 60) {
        segundos = minutos * 60 + segundosInput;
        tempo = segundos;
        shortRest = Math.floor(tempo / 5);
        longRest = Math.floor(tempo * (3 / 5));
        atualizarDisplay();
    } else {
        // Caso o formato seja inválido, mantemos o tempo original
        alert("Formato inválido (use MM:SS). Tempo não pode ser maior que 1 hora");
    }
}

function atualizarDisplay() // Atualiza o conteúdo do elemento HTML 
{
    document.querySelector("#segundos").textContent = segundosParaTempo (segundos);
}

function atualizarFoco ()
{
    const horario = segundosParaTempo (xfoco);
    document.querySelector("#xtempo").textContent = `Você manteve o foco por ${horario}`;
}

function passaTempo ()
{
    if (segundos >= 0 && tempoFoco)
    {
        segundos--;
        atualizarDisplay ();
        xfoco++;
        atualizarFoco ();

        if (segundos == 0)
        {
            tempoFoco = false;
            counterp++;
            if (counterp == 1)
            {
                document.querySelector("#xpomodoro").textContent = `Você fez ${counterp} pomodoro`;
            }
            else
            {
                document.querySelector("#xpomodoro").textContent = `Você fez ${counterp} pomodoros`;
            }
            //som de alarme

            if (counterp % 4 != 0)
            {
                segundos = shortRest;
                atualizarDisplay ();    
            }
            else if (counterp % 4 == 0)
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

            if (counterp % 4 == 0)
            {
                counterc++;
                if (counterc == 1)
                {
                document.querySelector("#xciclos").textContent = `Você concluiu ${counterc} ciclo`;
                }
                else
                {
                document.querySelector("#xciclos").textContent = `Você concluiu ${counterc} ciclos`;
                }
            }
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
    const caixinha = document.querySelector("#caixinha");
    const botaop = document.querySelector("#botaoplay");
    const botaodc = document.querySelector("#botao1");
    const botaof = document.querySelector("#botao2");
    const botaodl = document.querySelector("#botao3");
    const uai = document.querySelector("#instructions");

    if (tempoFoco)
    {
        body.classList.add('backgroundFoco');
        botaop.classList.add('playFoco');
        pomodoro.style.backgroundColor = 'var(--roxo-escurinho)';
        caixinha.style.backgroundColor = "var(--roxo-clarinho)";
        botaop.style.backgroundColor = 'var(--roxo-escurinho)';
        botaodc.style.backgroundColor = 'var(--roxo-escurinho)';
        botaof.style.backgroundColor = 'var(--roxo-escurinho)';
        botaodl.style.backgroundColor = 'var(--roxo-escurinho)';
        uai.style.backgroundColor = "var(--roxo-clarinho)";
        document.querySelector("#xmodo").textContent = `Modo de foco!`;
    }
    else
    {
        body.classList.remove('backgroundFoco');
        botaop.classList.remove('playFoco');
        pomodoro.style.backgroundColor = 'var(--azul-escurinho)';
        caixinha.style.backgroundColor = "var(--azul-clarinho)";
        botaop.style.backgroundColor = 'var(--azul-escurinho)';
        botaodc.style.backgroundColor = 'var(--azul-escurinho)';
        botaof.style.backgroundColor = 'var(--azul-escurinho)';
        botaodl.style.backgroundColor = 'var(--azul-escurinho)';
        uai.style.backgroundColor = "var(--azul-clarinho)";
        document.querySelector("#xmodo").textContent = `Modo de descanso!`;
    }
}
/* alteração do CSS modo de foco */
