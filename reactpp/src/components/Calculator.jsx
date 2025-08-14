import React, { useState, useMemo } from 'react';

// Fonction qui simule un calcul lourd et lent
const expensiveCalculation = (num) => {
  console.log('Démarrage du calcul lourd...');
  let total = 0;
  // La boucle est volontairement grande pour que le calcul soit notablement lent.
  for (let i = 0; i < num * 1000000; i++) {
    total += 1;
  }
  console.log('Calcul terminé.');
  return total;
};

const Calculator = () => {
  const [number, setNumber] = useState(1);
  const [theme, setTheme] = useState('light');

  // --- LA SOLUTION ---
  // useMemo "mémorise" le résultat de la fonction.
  // Le calcul ne sera ré-exécuté QUE si une des dépendances (ici, `number`) change.
  const calculationResult = useMemo(() => {
    return expensiveCalculation(number);
  }, [number]);

  const themeStyles = {
    background: theme === 'dark' ? '#222' : '#FFF',
    color: theme === 'dark' ? '#FFF' : '#222',
    padding: '2rem',
    transition: 'all 0.5s ease',
    minHeight: '200px'
  };

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div style={themeStyles}>
      <h2>Exercice useMemo : Calculateur</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value, 10) || 0)}
        placeholder="Entrez un nombre"
      />
      <h3>Résultat du calcul : {calculationResult}</h3>
      <hr />
      <button onClick={toggleTheme}>Changer le thème</button>
      <p>Thème actuel : {theme}</p>
      <div style={{marginTop: '20px', padding: '10px', background: 'rgba(0,255,0,0.1)'}}>
        <strong>Optimisé :</strong> Maintenant, changez le thème. Le changement est instantané car le calcul n'est pas relancé. Il ne se relancera que si vous modifiez le nombre dans l'input.
      </div>
    </div>
  );
};

export default Calculator;
