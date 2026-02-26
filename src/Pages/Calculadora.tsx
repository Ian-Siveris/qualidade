import { useState } from 'react'
import '../Style/Calculadoura.css';

function Calculadoura() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="Box">
        <div className="Result"></div>
        <div className="digitsGrid">
          <div className="box">7</div>
          <div className="box">8</div>
          <div className="box">9</div>
          <div className="box">C</div>
          <div className="box">4</div>
          <div className="box">5</div>
          <div className="box">6</div>
          <div className="box">+</div>
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
          <div className="box">-</div>
          <div className="box">=</div>
          <div className="box">0</div>
          <div className="box">*</div>
          <div className="box">/</div>
          <div className="box">,</div>
        </div>
      </div>
    </>
  )
}

export default Calculadoura
