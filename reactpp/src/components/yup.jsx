import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './UserProfile.css';

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Format d'email invalide")
    .required("L'email est requis")
    .matches(/@/, 'L\'email doit contenir "@"'),
  password: yup
    .string()
    .min(6, 'Le mot de passe doit faire au moins 6 caractères')
    .required('Le mot de passe est requis'),
});

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert('Formulaire valide !');
    reset();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-content">
        <div className="welcome-message">Bienvenue à Simplon</div>
        {/* Remplacez l'avatar par une citation motivante */}
        <div className="motivation-message">
          <em>“Le succès appartient à ceux qui se lèvent tôt et persévèrent.”</em>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
  );
};

export default UserProfile;