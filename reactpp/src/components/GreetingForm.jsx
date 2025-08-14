import React, { useState } from 'react';

const GreetingForm = () => {
  const [firstName, setFirstName] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="firstName">Prénom: </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </form>
      <p>Bonjour, {firstName}</p>
    </div>
  );
};

export default GreetingForm;
