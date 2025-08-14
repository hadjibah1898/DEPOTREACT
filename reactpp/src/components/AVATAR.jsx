import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    age: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const { prenom, nom, age } = formData;
  const isFormFilled = prenom && nom && age;

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="form-title">Mon formulaire en React</h1>
        
        <div className="form-group">
          <label htmlFor="prenom" className="form-label">
            Prénom :
          </label>
          <input
            id="prenom"
            type="text"
            value={prenom}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Entrez votre prénom"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nom" className="form-label">
            Nom :
          </label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Entrez votre nom"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age" className="form-label">
            Âge :
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Entrez votre âge"
          />
        </div>

        {isFormFilled && (
          <div className="greeting-container">
            <img 
              src={`https://i.pravatar.cc/150?u=${prenom}${nom}`}
              alt="Avatar"
              className="avatar-img"
            />
            <div className="greeting-message">
              <p>Bonjour, <span className="user-name">{prenom} {nom}</span></p>
              <p className="age-info">Vous avez {age} ans.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
