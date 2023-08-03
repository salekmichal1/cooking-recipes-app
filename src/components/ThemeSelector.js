import { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import modeIcon from '../assets/brightness.svg';

import './ThemeSelector.css';

const themeColors = ['#AA0010', '#ABA611', '#244C28'];

export default function ThemeSelector() {
  const { mode, changeMode, changeColor } = useContext(ThemeContext);

  const switchMode = function () {
    changeMode(mode === 'bright' ? 'dark' : 'bright');
  };

  useEffect(() => {
    if (mode === 'bright') {
      document.documentElement.style.setProperty('--card-background', '#fff');
    }
    if (mode === 'dark') {
      document.documentElement.style.setProperty('--card-background', '#555');
    }
  }, [mode]);

  return (
    <div className="theme-selector">
      <div className="theme-buttons">
        {themeColors.map(color => (
          <button
            className="theme-btn"
            key={color}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}></button>
        ))}
      </div>
      <img
        className="mode-button"
        src={modeIcon}
        alt="mode"
        onClick={switchMode}
        style={{ filter: mode === 'dark' ? 'invert(100%)' : 'unset' }}
      />
    </div>
  );
}
