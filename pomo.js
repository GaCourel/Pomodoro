let segundos = 1500, tempo = 1500, counterp = 0, counterc = 0, xfoco = 0;
let shortRest = Math.floor(tempo / 5), longRest = Math.floor(tempo * (3 / 5));
let tempoFoco = false, cronometro = false;
let timer;
const sfoco = new Audio('./sounds/level-up-191997.mp3');
const sdescanso = new Audio("./sounds/system-notification-alert-toast-warn-274740.mp3");

function segundosParaTempo (param)
{
    const zeroEsquerda = (n) => Math.floor(n).toString().padStart(2, '0');
    const min = zeroEsquerda (param / 60); 
    const s = zeroEsquerda (param % 60);
    return  `${min}:${s}`;
}

function atualizarTempo() /*atualiza o display após editar*/
{
    const tempoInput = document.querySelector("#segundos").textContent;
    const [minutos, segundosInput] = tempoInput.split(":").map(num => parseInt(num));
    
    /* Verifica se a entrada tem formato válido de tempo MM:SS */
    if (!isNaN(minutos) && !isNaN(segundosInput) && minutos >= 0 && segundosInput >= 0 && segundosInput < 60 && minutos <= 60) 
    {
        segundos = minutos * 60 + segundosInput;
        tempo = segundos;
        shortRest = Math.floor(tempo / 5);
        longRest = Math.floor(tempo * (3 / 5));
        atualizarDisplay();
    } else 
    {
        alert("Formato inválido (use MM:SS). Tempo não pode ser maior que 1 hora");
        atualizarDisplay();
    }
}

function atualizarDisplay() 
{
    document.querySelector("#segundos").textContent = segundosParaTempo (segundos);
}

function atualizarFoco () /*contador de tempo em foco da caixinha*/
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
            sdescanso.play();
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
            sfoco.play();
            alterarModo ();
        }
    }
    
}

function play_pause() 
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

/*diferentes tempos*/
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
/*diferentes tempos*/

/*botão instructions*/
function abrirModal ()
{
    const modal = document.querySelector("dialog");
    modal.showModal();
}

function fecharModal ()
{
    const modal = document.querySelector("dialog");
    modal.close();
}
/*botão instructions*/

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
    const dialog = document.querySelector("dialog");
    const fechar = document.querySelector("#fechar");

    if (tempoFoco)
    {
        body.classList.add('backgroundFoco');
        botaop.classList.add('playFoco');
        pomodoro.style.backgroundColor = 'var(--roxo-escurinho)';
        caixinha.style.backgroundColor = "var(--roxo-escurinho2)";
        botaop.style.backgroundColor = 'var(--roxo-escurinho2)';
        botaodc.style.backgroundColor = 'var(--roxo-escurinho2)';
        botaof.style.backgroundColor = 'var(--roxo-escurinho2)';
        botaodl.style.backgroundColor = 'var(--roxo-escurinho2)';
        uai.style.backgroundColor = "var(--roxo-escurinho2)";
        dialog.style.backgroundColor = "var(--roxo-escurinho)";
        fechar.style.backgroundColor = "var(--roxo-escurinho2)";
        document.querySelector("#xmodo").textContent = `Modo de foco!`;
    }
    else
    {
        body.classList.remove('backgroundFoco');
        botaop.classList.remove('playFoco');
        pomodoro.style.backgroundColor = 'var(--azul-escurinho)';
        caixinha.style.backgroundColor = "var(--azul-escurinho2)";
        botaop.style.backgroundColor = 'var(--azul-escurinho2)';
        botaodc.style.backgroundColor = 'var(--azul-escurinho2)';
        botaof.style.backgroundColor = 'var(--azul-escurinho2)';
        botaodl.style.backgroundColor = 'var(--azul-escurinho2)';
        uai.style.backgroundColor = "var(--azul-escurinho2)";
        dialog.style.backgroundColor = "var(--azul-escurinho)";
        fechar.style.backgroundColor = "var(--azul-escurinho2)";
        document.querySelector("#xmodo").textContent = `Modo de descanso!`;
    }
}
/* alteração do CSS modo de foco */
