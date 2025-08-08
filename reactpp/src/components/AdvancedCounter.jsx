import React, { useState, useEffect } from 'react';

function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    if (count % 2 === 0) {
      setCalculation(count * 2); // Pair → ×2
    } else {
      setCalculation(count ** 2); // Impair → carré
    }
  }, [count]);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', backgroundColor: count === 0 ? 'white' : (count % 2 === 0 ? 'lightgreen' : 'lightcoral') }}>
      <h2>🧮 Compteur Avancé</h2>
      <p>Valeur actuelle : <strong>{count}</strong></p>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setCount(count - 1)} style={{ fontSize: '24px', margin: '5px' }}>➖</button>
        <button onClick={() => setCount(count + 1)} style={{ fontSize: '24px', margin: '5px' }}>➕</button>
      </div>

      <p>
        📊 Résultat calculé : <strong>{calculation}</strong><br />
        {count % 2 === 0 ? '✨ Nombre pair (×2)' : '🔥 Nombre impair (au carré)'}
      </p>
    </div>
  );
}

export default AdvancedCounter;