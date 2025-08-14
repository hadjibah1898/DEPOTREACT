import React, { useState } from 'react';
import { useFormik } from 'formik';

const UserInfoForm = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const formik = useFormik({
    initialValues: {
      prenom: '',
      nom: '',
      age: '',
    },
    onSubmit: values => {
      setSubmittedData(values);
    },
  });

  return (
    <div className="form-card">
      <h1 className="form-title">Informations Utilisateur</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="prenom" className="form-label">Prénom</label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.prenom}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input
            id="nom"
            name="nom"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nom}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age" className="form-label">Âge</label>
          <input
            id="age"
            name="age"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.age}
            className="form-input"
          />
        </div>

        <button type="submit" className="form-submit">Soumettre</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Données soumises :</h2>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UserInfoForm;
