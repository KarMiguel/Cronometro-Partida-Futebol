$(document).ready(function() {
    $('#btnIniciar').on('click', function() {
        
        let time1 = $('#time1').val();
        if (time1.length <=0) {
            mensagem('Nome do time obrigatorio!')
        return;

        }
    
        let time2 = $('#time2').val();
        if (time2.length <=0) {
            mensagem('Nome do time obrigatorio!')
        return;
        }
    
        let tempoPartida = $('#tempoPartida').val();
        if (tempoPartida.length <=0) {
        mensagem('Tempo obrigatorio!');
        return;
        }
    
        $('#containerCadastro').addClass('hidden');
        $('#containerPlacar').removeClass('hidden');

        
        cadastro();
        
    });
});

function cadastro(){
    let time1= $('#time1').val();
    let time2= $('#time2').val();

    console.log(time1 +" - "+ time2)

    $('#nomeTime1').text(time1);
    $('#nomeTime2').text(time2);

}

function mostrarImagem(input, elemento) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $(elemento).attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
}

$('#logo1').on('change', function() {

    mostrarImagem(this,'#logotime1');
  });

  $('#logo2').on('change', function() {

    mostrarImagem(this,'#logotime2');
});
  
function addPlacar(id) {
    let qntdAtual = parseInt($("#numeroPlacar" + id).text());
    if(qntdAtual>=0){
        $('#numeroPlacar' + id).text(qntdAtual + 1);
    }
}

function diminuirPlacar(id) {
    let qntdAtual = parseInt($("#numeroPlacar" + id).text());
    if(qntdAtual>0){
        $('#numeroPlacar' + id).text(qntdAtual - 1);
    }else{
        $('#numeroPlacar' + id).text(0);
    }
}

    let tempoInicial = 0;
    let cronometro;

function formatarTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = 
    Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
}


function atualizarCronometro() {
    tempoInicial--;
    $("#cronometro").text(formatarTempo(tempoInicial));

    if (tempoInicial <= 0) { 
        mensagem('TEMPO ESGOTADO','green');
        clearInterval(cronometro); 
    }
}


$("#play").on("click", function () {
    if ($(this).text() === ">") {
        // Iniciar o cronômetro
        cronometro = setInterval(atualizarCronometro, 1000);
        $(this).text("||"); 
    } else {
        // Pausar o cronômetro
        clearInterval(cronometro);
        $(this).text(">"); 
    }
});

$("#tempoPartida").on("change", function () {
    const tempoInput = $(this).val();
    const [horas,minutos] = tempoInput.split(":").map(Number);
    tempoInicial = horas * 3600 + minutos * 60;
    $("#cronometro").text(tempoInput);
});

function mensagem  (texto, cor = 'red', tempo = 3000){

    let id = Math.floor(Date.now() * Math.random()).toString();

    let msg = `<div id="msg-${id}" class= "toast animated fadeInDown ${cor}">${texto} </div>`

    $("#container-mensagens").append(msg);

    setTimeout(()=>{
        $("#msg-"+id).removeClass('fadeInDown');
        $("#msg-"+id).addClass('fadeOutUp');
        setTimeout(() =>{
            $("#msg-"+id).remove();
        },800)
    },tempo)

}