const apiKey = 'SUA API KEY AQUI';
const city = 'NOME DA SUA CIDADE AQUI';
const apiUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;

var body = document.getElementById('corpo');
var informacoesPrincipais = document.getElementById('informacoes-principais');
var campoTemperatura = document.getElementById('temperatura');
var campoHorario = document.getElementById('horario');
var campoDescricao = document.getElementById('descricao');

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }
    return response.json();
  })
  .then(informacoes => {
    nomeCidade = document.createElement('label');
    temperaturaCidade = document.createElement('label');
    sensacaoTermica = document.createElement('label');
    umidadeRelativa = document.createElement('label');
    descricaoDoTempo = document.createElement('label');
    velocidadeDoVento = document.createElement('label');
    direcaoDoVento = document.createElement('label');
    horario = document.createElement('label');
    imagem = document.createElement('img');

    nomeCidade.textContent = informacoes['data'][0].city_name;
    temperaturaCidade.textContent = `${informacoes['data'][0].temp}°`;
    sensacaoTermica.textContent = informacoes['data'][0].app_temp;
    umidadeRelativa.textContent = informacoes['data'][0].rh;
    descricaoDoTempo.textContent = informacoes['data'][0].weather.description;
    velocidadeDoVento.textContent = informacoes['data'][0].wind_spd;
    direcaoDoVento.textContent = informacoes['data'][0].wind_cdir_full;

    function atualizarHorario(){
        var horaAtual = new Date();
        var hora = horaAtual.getHours();
        var minutos = horaAtual.getMinutes();
        var segundos = horaAtual.getSeconds();

        if(hora >= 6 && hora < 12){
            body.style.background = 'linear-gradient(to bottom, rgba(40,168,232,1), rgba(71,210,235,1))';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = '1024px 600px';
            imagem.src = './images/sol.png';
        } else if(hora >= 12 && hora < 18) {
            body.style.background = 'linear-gradient(to bottom, rgba(231,168,26,1), rgba(235,220,71,1))';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = '1024px 600px';
            imagem.src = './images/sol.png';
        } else if(hora >= 18 && hora < 24) {
            body.style.background = 'linear-gradient(to bottom, rgba(9,49,200,1), rgba(81,119,235,1))';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = '1024px 600px';
            imagem.src = './images/lua.png';
        }

        if(hora < 10 && minutos < 10){
            horario.textContent = `0${hora}:0${minutos}`; 
        } else if(hora < 10 && minutos > 10) {
            horario.textContent = `0${hora}:${minutos}`;
        } else {
            horario.textContent = `${hora}:${minutos}`;
        }

        campoHorario.appendChild(horario);
    }

    informacoesPrincipais.appendChild(nomeCidade);
    campoTemperatura.appendChild(temperaturaCidade);
    campoTemperatura.appendChild(imagem);
    campoDescricao.appendChild(descricaoDoTempo)
    setInterval(atualizarHorario, 1000)
    console.log(informacoes);
  })
  .catch(error => {
    console.error('Erro:', error);
  });

setTimeout(function() {
    location.reload();
}, 2400000);
