import React, {useState} from 'react';
import './index.css';

function App() {
  const [result, setResult] = useState('0');
  const [bool, setBool] = useState(false);
  const [boolOper, setBoolOper] = useState(true);
  function changeResult(e) {
    if(/[+]|[-]|[*]|[/]/.test(result[result.length - 1]) === true) {
      setBool(false);
    }
    if(result === 'Infinity' || result === '-Infinity'){
      setResult("0");
    } else{
      if(result === '0' && e.target.value){
        setResult(e.target.value);
    } else {
        setResult(result + e.target.value);
      }
      setBoolOper(false);
    }
  }
  
  function addDecimal(e) {
    if(result === 'Infinity' || result === '-Infinity'){
      setResult("0");
    } else {
      setResult(result + e.target.value);
      setBool(true);
      setBoolOper(true);
    }
  }
  
function changeOper(e) {
    if(result === 'Infinity' || result === '-Infinity'){
      setResult("0");
    } else {
      if(result[result.length - 1] !== e.target.value && /\D/.test(result[result.length - 1]) === true){
        if(result[result.length - 1] !== '-' && e.target.value === '-'){
          if(result[result.length - 2] === "-"){
             setResult(result);
          }else{
            setResult(result + '-');
          }
        }else if(/\D/.test(result[result.length - 2]) === true && /\D/.test(result[result.length - 1]) === true){
          let str = loop(2);
          setResult(str + e.target.value);
        }else if(result[result.length - 1] === '-' && e.target.value === "+" ){
          setResult(result + e.target.value);
        }else {
          let str = loop(1);
          str += e.target.value;
          setResult(str);
        }
      }else if(result[result.length - 1] === e.target.value && result[result.length - 1] !== '-' && e.target.value !== '-'){
        setResult(result);
      }else if(result[result.length - 1] === '-' && e.target.value === '-'){
        if(result[result.length - 2] !== '-' && result[result.length - 2] !== '*' && result[result.length - 2] !== '/' && result[result.length - 2] !== '+'){
          setResult(result + '-');
        }else {
          setResult(result);
        }
      }else {
        setResult(result + e.target.value);
      }
      setBool(true);
    }
  }
  
  function loop(num){
    let str = '';
    for(let i = 0; i < result.length - num; i++){
        str += result[i];
    }
    return str;
  }
  
  function clearing() {
    setResult('0');
    setBool(false);
  }
  
  function getResult() {
    if(/\D/.test(result[result.length - 1]) === true){
      let str = '';
      for(let i = 0; i < result.length - 1; i++){
        str += result[i];   
      }
      // eslint-disable-next-line
      setResult(String(Math.round(1000000000000 * eval(str.replace('--', '+0+0+0+0+0+0+'))) / 1000000000000));
    }else {
      // eslint-disable-next-line
      setResult(String(Math.round(1000000000000 * eval(result.replace('--', '+0+0+0+0+0+0+'))) / 1000000000000));
    }
  }
  
  return (
    <div className="App">
        <button className="btn" onClick={changeResult} id="one" value="1">1</button>
        <button className="btn" onClick={changeResult} id="two" value="2">2</button>
        <button className="btn" onClick={changeResult} id="three" value="3">3</button>
        <button className="btn" onClick={changeResult} id="four" value="4">4</button>
        <button className="btn" onClick={changeResult} id="five" value="5">5</button>
        <button className="btn" onClick={changeResult} id="six" value="6">6</button>
        <button className="btn" onClick={changeResult} id="seven" value="7">7</button>
        <button className="btn" onClick={changeResult} id="eight" value="8">8</button>
        <button className="btn" onClick={changeResult} id="nine" value="9">9</button>
        <button className="btn" onClick={changeResult} id="zero" value="0">0</button>
        <button className="btn" onClick={addDecimal} id="decimal" value="." disabled={bool}>.</button>
        <button className="btn" onClick={changeOper} id="plus" value="+" disabled={boolOper}>+</button>
        <button className="btn" onClick={changeOper} id="minus" value="-" disabled={boolOper}>-</button>
        <button className="btn" onClick={changeOper} id="multiply" value="*" disabled={boolOper}>x</button>
        <button className="btn" onClick={changeOper} id="devide" value="/" disabled={boolOper}>/</button>
        <button className="btn" onClick={clearing} id="clear" value="AC">AC</button>
        <button className="btn" onClick={getResult} id="equals" value="=" disabled={boolOper}>=</button>
        <p id="text">{result}</p>
    </div>
  );
}

export default App;
