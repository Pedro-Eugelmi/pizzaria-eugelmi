    //variaveis de controle de tela 
    let seuVotoPara= document.querySelector('.infleft-1 span')
    let cargo = document.querySelector('.infleft-2 span')
    let descricao = document.querySelector('.inleft-4')
    let aviso = document.querySelector('.infbottom')
    let numeros = document.querySelector('.infleft-3')
    let lateral = document.querySelector('.infright')
    var candidatearea = document.querySelector('.candidatesArea'); 

    let etapaatual = 0;
    let numero = ''
    let votobranco = false 

    começaretapa()
    function começaretapa(){
        let etapa = lista[etapaatual]
        let numeroHTML = '';
        numero = '';
        votobranco = false;

        for( let i =0; i<etapa.numeros; i++){
            if( i === 0){
                numeroHTML += '<div class="number pisca"></div>'
            }else{
            numeroHTML += '<div class="number"></div>'}
        }   


        seuVotoPara.style.display = 'none';
        cargo.innerHTML = etapa.titulo;
        descricao.innerHTML =' ';
        aviso.style.display = 'none'
        lateral.style.display = 'none';
        numeros.innerHTML = numeroHTML;
    
        //modal dos candidatos
    let candidateinf = document.querySelector('.candidate');
    candidatearea.innerHTML = '';
    for (let i = 0; i < etapa.candidatos.length; i++) {
        let cloneinf = candidateinf.cloneNode(true);
        let imgarea = cloneinf.querySelector('.imgArea img');
        let namearea = cloneinf.querySelector('.nameArea h2');
        let partyArea = cloneinf.querySelector('.partyArea h6 span');
        let numbers = cloneinf.querySelector('.numbers h1');

        imgarea.src = etapa.candidatos[i].fotos[0].url;
        namearea.innerHTML = etapa.candidatos[i].nome;
        partyArea.innerHTML = etapa.candidatos[i].partido;
        numbers.innerHTML = etapa.candidatos[i].numero
        cloneinf.style.display = 'flex';

        candidatearea.appendChild(cloneinf);
    }
    }
    function atualizarinterface() 
    {
    let etapa = lista[etapaatual]
    let candidato = etapa.candidatos.filter((item)=>{
        if (item.numero === numero){
            return true
        } else {
            return false
        }
    });
        if( candidato.length > 0){
        candidato = candidato[0];
        

            seuVotoPara.style.display = 'block';
            if (candidato.vice === undefined){
                descricao.innerHTML =`Nome: ${candidato.nome} <br> Partido: ${candidato.partido} <br>`;

            }else {descricao.innerHTML =`Nome: ${candidato.nome} <br> Partido: ${candidato.partido} <br> vice: ${candidato.vice}`;}
            
            aviso.style.display = 'block'
            let fotosHTML = '';
            for(let i in candidato.fotos){
                if (candidato.fotos[i].small)
                {
                    fotosHTML +=`<img class="small" src="${candidato.fotos[i].url}"></img>`
                }else {
                    fotosHTML +=`<img src="${candidato.fotos[i].url}"></img>`
                }
                
            }
            lateral.style.display ='block';
            lateral.innerHTML = fotosHTML;
        }else 
        {
            seuVotoPara.style.display = 'block';
            aviso.style.display = 'block'
            descricao.innerHTML = '<div class="avisoGrande pisca">VOTO NULO</div>';
        }

    }

    function clicou(n){
    let elnumero = document.querySelector('.number.pisca')
    if(elnumero !== null){
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;
        elnumero.classList.remove('pisca');
        if( elnumero.nextElementSibling !== null){
            elnumero.nextElementSibling.classList.add('pisca')
        }else{
            atualizarinterface()
        }
    }
    }
    function branco() {
        votobranco = true 
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block'
        numeros.innerHTML = ' '
        descricao.innerHTML = '<div class="avisoGrande pisca">VOTO EM BRANCO</div>';
        lateral.style.display = 'none';
        
    }
    function corrige(){
        começaretapa()
    }
    function confirma(){
        let votoconfirmado = false
        let etapa = lista[etapaatual]

        if( votobranco === true ){
        votoconfirmado = true}

        if ( numero.length === etapa.numeros ){
            votoconfirmado = true}
            
        if ( votoconfirmado === true){
            etapaatual++;
        }

        if (lista[etapaatual] !== undefined)
        { começaretapa()}
        else {

            document.querySelector('.tela').innerHTML = '<div class="giantaviso pisca">FIM</div>'
            candidatearea.innerHTML = '<h1 class="thanks"> Obrigado Pela sua Participação</h1>'

        }

        
    }

