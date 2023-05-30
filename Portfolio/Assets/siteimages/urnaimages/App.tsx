import React, { useState } from 'react';
import styles from './app.module.css';
import {levels, calculateIMC, level } from './helpers/imc';
import {GridItem} from './components/griditem/griditem';
import leftArrowImage from './assets/leftarrow.png'
import pedrologo from './assets/Logopedro.png'
import bmiLogo from'./assets/bmilogo.png'

function App() {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setweightField] = useState<number>(0);
  const[toshow, setToshow] = useState<level | null>(null)
const handleClick = () => {
  if (heightField && weightField) {
    setToshow(calculateIMC(heightField, weightField))
  } else {
    alert('Preencha todos os campos.');
  }
};
  function handleBackButton()
  { setToshow(null);
    setHeightField(0);
    setweightField(0);}

  return (
    <div className={styles.Main} >
        <header>
          <img src={bmiLogo}  />
        </header> 
        <div className={styles.container}>

          <div className={styles.leftSide}>
            <h1>Calcule o seu IMC</h1>
            
            <p>Criado no século 19 pelo matemático Lambert Quételet, 
              o Índice de Massa Corporal, conhecido pela sigla IMC, é um cálculo simples que permite medir se alguém está ou não com o peso ideal. 
              Ele aponta se o peso está adequado ou se está abaixo ou acima do peso.</p>

              <input className={styles.height} 
              type="number"
              placeholder='Digite a sua Altura'
              value={( heightField > 0 ? heightField:'' )}
              onChange={e => setHeightField(parseFloat(e.target.value))}
              disabled={ toshow ? true:false}
              />
               <input className={styles.weight} 
              type="number"
              placeholder='Digite o seu Peso'
              value={( weightField > 0 ? weightField:'' )}
              onChange={e => setweightField(parseFloat(e.target.value))}
              disabled={ toshow ? true:false}
              />
              <button onClick={handleClick} disabled={ toshow ? true:false}>
                Calcular
              </button>
          </div>

          <div className={styles.rightSide}>
              {!toshow &&
              <div className={styles.grid}>
                {levels.map((item,key)=>(
                  <GridItem key={key} item={item}/>
                
                ))}
              </div>
              }
              {toshow &&
                <div className={styles.rightBig}>
                
                  <div className={styles.rightArrow} onClick={handleBackButton}>
                    <img src={leftArrowImage} width={25} />
                  </div>
                  <GridItem item={toshow}/>

                </div>
              }
          </div> 

        </div>
        <footer>
          <img src={pedrologo} />
        </footer>
    </div>
  );
}

export default App;
