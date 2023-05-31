 document.querySelector('.busca button').addEventListener('click', async (event)=>
 {  event.preventDefault();
    
    let city = document.querySelector('#searchInput').value 
    if ( city !== '')
    {   warning("Carregando...")
        clearInfo()
      
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=8136a7f8ca8e9be645e4a2b284848538&units=metric&lang=pt_br`
        let results = await fetch(url)
        let json = await results.json()

        if (json.cod === 200)
            {
            showinfo(
                { cityName: json.name,
                country: json.sys.country,
                desc: json.weather[0].description,
                icon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windDeg: json.wind.deg,
                temp: json.main.temp
                });
            }  
         else{
                clearInfo()
                warning('City not Found')
             }

        
    };
 });



    function warning(msg)
        { document.querySelector('.aviso').innerHTML = msg

        };

    function showinfo(json)
        {   
            
            warning('') 

            
            document.querySelector('.resultado .titulo').innerHTML = `${json.cityName} - ${json.country}`
            document.querySelector('.tempInfo').innerHTML = json.temp;
            document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}km/h`
            document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg -90}deg)`
            document.querySelector('.info img').src = `http://openweathermap.org/img/wn/${json.icon}@2x.png`
            document.querySelector('.resultado').style.display = 'block';

        };
        function clearInfo()
        {
            document.querySelector('.resultado').style.display = 'none';
        }
