import { useState, useEffect } from 'react';

function useDarkMode() {
  // On récupère la préférence stockée dans localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false; // false = mode clair par défaut
  });

  // Met à jour localStorage et le body de la page à chaque changement
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Fonction pour basculer entre les modes
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return [isDarkMode, toggleDarkMode];
}

export default useDarkMode;
