import React, { useState, useCallback } from 'react';

const Child = React.memo(({ sayHello }) => {
  console.log("Enfant rendu"); // Modifié pour voir la différence
  return (
    <div>
      <p>Je suis le composant enfant (optimisé).</p>
      <button onClick={sayHello}>Dire bonjour</button>
    </div>
  );
});

const Parent = () => {
  const [count, setCount] = useState(0);

  // La fonction est maintenant "mémorisée" et ne sera pas recréée à chaque rendu.
  const sayHello = useCallback(() => {
    console.log("Hello");
  }, []); // Le tableau vide [] signifie que la fonction n'a pas de dépendances

  console.log("Parent rendu");

  return (
    <div>
      <h2>Composant Parent</h2>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter le compteur : {count}
      </button>
      <hr />
      <Child sayHello={sayHello} />
    </div>
  );
};

export default Parent;

