import { useState } from 'react';
import '../Style/Calculadoura.css';
import { Dinheiro } from './backend/calculadora_back.tsx';

function Calculadoura() {

  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForNewValue) {
      setDisplay(digit);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputComma = () => {
    if (waitingForNewValue) {
      setDisplay('0,');
      setWaitingForNewValue(false);
    } else if (!display.includes(',')) {
      setDisplay(display + ',');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const calculate = (left: number, right: number, op: string): number => {
    const dLeft = new Dinheiro(left);

    try {
      switch (op) {
        case '+':
          return dLeft.somar(new Dinheiro(right)).obterValorDecimal();
        case '-':
          return dLeft.subtrair(new Dinheiro(right)).obterValorDecimal();
        case '*':
          return dLeft.multiplicar(right).obterValorDecimal();
        case '/':
          return dLeft.dividir(right).obterValorDecimal();
        default:
          return right;
      }
    } catch {
      clear();
      return 0;
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display.replace(',', '.'));

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator);
      setDisplay(String(result).replace('.', ','));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  const handleEqual = () => {
    if (!operator || previousValue === null) return;

    const inputValue = parseFloat(display.replace(',', '.'));
    const result = calculate(previousValue, inputValue, operator);

    setDisplay(String(result).replace('.', ','));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  return (
    <div className="calculatorContainer">

      <div className="Box">

        <div className="Result">
          {display}
        </div>

        <div className="digitsGrid">

          <div className="box" onClick={() => inputDigit('7')}>7</div>
          <div className="box" onClick={() => inputDigit('8')}>8</div>
          <div className="box" onClick={() => inputDigit('9')}>9</div>
          <div className="box clear" onClick={clear}>C</div>

          <div className="box" onClick={() => inputDigit('4')}>4</div>
          <div className="box" onClick={() => inputDigit('5')}>5</div>
          <div className="box" onClick={() => inputDigit('6')}>6</div>
          <div className="box operator" onClick={() => handleOperator('+')}>+</div>

          <div className="box" onClick={() => inputDigit('1')}>1</div>
          <div className="box" onClick={() => inputDigit('2')}>2</div>
          <div className="box" onClick={() => inputDigit('3')}>3</div>
          <div className="box operator" onClick={() => handleOperator('-')}>-</div>

          <div className="box operator" onClick={inputComma}>,</div>
          <div className="box" onClick={() => inputDigit('0')}>0</div>
          <div className="box operator" onClick={() => handleOperator('/')}>/</div>
          <div className="box operator" onClick={() => handleOperator('*')}>*</div>

          <div className="box equal" onClick={handleEqual}>=</div>

        </div>

      </div>

    </div>
  );
}

export default Calculadoura;