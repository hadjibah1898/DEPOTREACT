import React, { useState } from 'react';

function BoutonMessage() {
  const [messageVisible, setMessageVisible] = useState(false);

  const handleClick = () => {
    setMessageVisible(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Clique-moi</button>
      {messageVisible && <p>Bouton cliqué !</p>}
    </div>
  );
}

export default BoutonMessage;