import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

const UserLanguage = () => {
  const { user, setUser } = useContext(UserContext);

  // Exemple simple pour changer la langue
  const changeLanguage = () => {
    setUser({
      ...user,
      language: user.language === 'français' ? 'anglais' : 'français'
    });
  };

  return (
    <div>
      <h2>Langue préférée</h2>
      <p>Langue actuelle : {user.language}</p>
      <button onClick={changeLanguage}>Changer la langue</button>
    </div>
  );
};

export default UserLanguage;
