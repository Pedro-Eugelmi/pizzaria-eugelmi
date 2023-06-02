    // Utilizando Teclado
    document.body.addEventListener('keyup', (event)=>{
        playSound(event.code.toLowerCase())
    })
    //No Celular
    document.querySelectorAll('.key').forEach(element => 
        {element.addEventListener('click', ()=> 
        { playSound(element.getAttribute('data-key'))
        }
        )});


    function playSound(sound)
    {
        let audioElement = document.querySelector(`#s_${sound}`)
        let keyElement = document.querySelector(`div[data-key="${sound}"]`)
        if(audioElement)
        {
        audioElement.currentTime = 0;
        audioElement.play();
        };
        if(keyElement)
        {
            keyElement.classList.add('active')
            setTimeout(()=>
            {
                keyElement.classList.remove('active')
            }
            , 300);
        }
    };

//Composição

    document.querySelector('.composer button').addEventListener('click', ()=>{
       
        let song = document.querySelector('#input').value;
        
        if(song !== '')
        {
            let songarray = song.split('');
            composition(songarray)
        }
    });

    function composition(songarray)
    {
        let wait = 0
        
        for(let songitem of songarray)   
        {   

            setTimeout(()=>
            {
                playSound(`key${songitem}`)
            }, wait)
            wait += 250
            
        }
    }

