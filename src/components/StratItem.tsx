// components/StratItem.tsx
import React, { useState } from 'react';
import './StratItem.css'

type Strat = {
    s_id: number;
    m_id: number;
    s_name: string;
    m_name: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
  };

interface StratItemProps {
  strat: Strat;
}

const StratItem: React.FC<StratItemProps> = ({ strat }) => {
  const [inputValues, setInputValues] = useState({
    p1: strat.p1,
    p2: strat.p2,
    p3: strat.p3,
    p4: strat.p4,
    p5: strat.p5,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, player: string) => {
    setInputValues({ ...inputValues, [player]: e.target.value });
  };

  return (
    <div className="strat-item-container">
      <h3>Strat: {strat.s_name}</h3>
      <div className="strat-item">
        <p>Map: {strat.m_name}</p>
        <label>
          Player 1:
          <input
            type="text"
            value={inputValues.p1}
            onChange={(e) => handleInputChange(e, 'p1')}
          />
        </label>
        <label>
          Player 2:
          <input
            type="text"
            value={inputValues.p2}
            onChange={(e) => handleInputChange(e, 'p2')}
          />
        </label>
        <label>
          Player 3:
          <input
            type="text"
            value={inputValues.p3}
            onChange={(e) => handleInputChange(e, 'p3')}
          />
        </label>
        <label>
          Player 4:
          <input
            type="text"
            value={inputValues.p4}
            onChange={(e) => handleInputChange(e, 'p4')}
          />
        </label>
        <label>
          Player 5:
          <input
            type="text"
            value={inputValues.p5}
            onChange={(e) => handleInputChange(e, 'p5')}
          />
        </label>
        <button>Save</button>
      </div>
    </div>
  );
};

export default StratItem;