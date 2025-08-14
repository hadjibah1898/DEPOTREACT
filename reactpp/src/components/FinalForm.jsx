// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import './UserProfile.css';

// const schema = yup.object().shape({
//   prenom: yup
//     .string()
//     .required('Le prénom est requis')
//     .min(2, 'Le prénom doit contenir au moins 2 caractères'),
//   email: yup
//     .string()
//     .required("L'email est requis")
//     .email("Format d'email invalide"),
//   password: yup
//     .string()
//     .required('Le mot de passe est requis')
//     .min(6, 'Le mot de passe doit faire au moins 6 caractères'),
//   age: yup
//     .number()
//     .typeError("L'âge doit être un nombre")
//     .required("L'âge est requis")
//     .integer("L'âge doit être un nombre entier")
//     .min(0, "L'âge doit être positif"),
// });

// const FinalForm = () => {
//   const [submittedData, setSubmittedData] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/form', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
      

//       const result = await response.json();

//       if (response.ok) {
//         setSubmittedData(result);
//         console.log('Réponse du serveur:', result.message);
//         reset();
//       } else {
//         // Gérer les erreurs venant du serveur
//         console.error('Erreur du serveur:', result.message);
//         setSubmittedData({ error: result.message });
//       }
//     } catch (error) {
//       // Gérer les erreurs réseau
//       console.error('Erreur lors de la soumission:', error);
//       setSubmittedData({ error: 'Impossible de joindre le serveur.' });
//     }
//   };

//   return (
//     <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
//       <div className="form-content">
//         <div className="welcome-message">Formulaire final - Simplon</div>
//         <div className="form-group">
//           <label>Prénom :</label>
//           <input type="text" {...register('prenom')} />
//           {errors.prenom && <p className="error-message">{errors.prenom.message}</p>}
//         </div>
//         <div className="form-group">
//           <label>Email :</label>
//           <input type="email" {...register('email')} />
//           {errors.email && <p className="error-message">{errors.email.message}</p>}
//         </div>
//         <div className="form-group">
//           <label>Mot de passe :</label>
//           <input type="password" {...register('password')} />
//           {errors.password && <p className="error-message">{errors.password.message}</p>}
//         </div>
//         <div className="form-group">
//           <label>Âge :</label>
//           <input type="number" {...register('age')} />
//           {errors.age && <p className="error-message">{errors.age.message}</p>}
//         </div>
//         <button type="submit" className="submit-button">Envoyer</button>
//       </div>
//       {submittedData && (
//         <div style={{
//           background: '#f3f4f6',
//           borderRadius: 8,
//           margin: '18px auto 0 auto',
//           padding: 16,
//           maxWidth: 420,
//           fontFamily: 'monospace',
//           color: '#374151',
//           fontSize: '1em'
//         }}>
//           <strong>Données envoyées :</strong>
//           <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
//             {JSON.stringify(submittedData, null, 2)}
//           </pre>
//         </div>
//       )}
//     </form>
//   );
// };
// export default FinalForm ;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './UserProfile.css';

const schema = yup.object().shape({
  prenom: yup
    .string()
    .required('Le prénom est requis')
    .min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: yup
    .string()
    .required("L'email est requis")
    .email("Format d'email invalide"),
  password: yup
    .string()
    .required('Le mot de passe est requis')
    .min(6, 'Le mot de passe doit faire au moins 6 caractères'),
  age: yup
    .number()
    .typeError("L'âge doit être un nombre")
    .required("L'âge est requis")
    .integer("L'âge doit être un nombre entier")
    .min(0, "L'âge doit être positif"),
});

const FinalForm = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [serverData, setServerData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmittedData(result);
        console.log('Réponse du serveur:', result.message);
        reset();
        fetchData(); // Recharge la liste après POST
      } else {
        console.error('Erreur du serveur:', result.message);
        setSubmittedData({ error: result.message });
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setSubmittedData({ error: 'Impossible de joindre le serveur.' });
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users'); 
      const data = await response.json();
      setServerData(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-content">
          <div className="welcome-message">Formulaire final - Simplon</div>
          <div className="form-group">
            <label>Prénom :</label>
            <input type="text" {...register('prenom')} />
            {errors.prenom && <p className="error-message">{errors.prenom.message}</p>}
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input type="email" {...register('email')} />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label>Mot de passe :</label>
            <input type="password" {...register('password')} />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <div className="form-group">
            <label>Âge :</label>
            <input type="number" {...register('age')} />
            {errors.age && <p className="error-message">{errors.age.message}</p>}
          </div>
          <button type="submit" className="submit-button">Envoyer</button>
        </div>
        {submittedData && (
          <div style={{
            background: '#f3f4f6',
            borderRadius: 8,
            margin: '18px auto 0 auto',
            padding: 16,
            maxWidth: 420,
            fontFamily: 'monospace',
            color: '#374151',
            fontSize: '1em'
          }}>
            <strong>Données envoyées :</strong>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </form>

      <button 
        style={{
          marginTop: '20px', 
          padding: '10px 20px', 
          background: '#2563eb', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px',
          cursor: 'pointer'
        }} 
        onClick={fetchData}
      >
        Afficher toutes les données
      </button>

      {serverData.length > 0 && (
        <div style={{ marginTop: '20px', background: '#f9fafb', padding: '15px', borderRadius: '8px' }}>
          <h3>Données depuis le serveur :</h3>
          <pre>
            {JSON.stringify(serverData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FinalForm;
