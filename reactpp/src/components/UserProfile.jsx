import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './UserProfile.css';

const passwordRules = [
  {
    label: '8 à 20 caractères',
    test: (v) => v.length >= 8 && v.length <= 20,
  },
  {
    label: 'Au moins une lettre majuscule',
    test: (v) => /[A-Z]/.test(v),
  },
  {
    label: 'Au moins une lettre minuscule',
    test: (v) => /[a-z]/.test(v),
  },
  {
    label: 'Au moins un chiffre',
    test: (v) => /[0-9]/.test(v),
  },
  {
    label: 'Au moins un caractère spécial (@$!%*?&)',
    test: (v) => /[@$!%*?&]/.test(v),
  },
];

const schema = yup.object().shape({
  email: yup
    .string()
    .required("L'email est requis")
    .email("Format d'email invalide")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "L'email doit respecter le format nom@domaine.extension"
    ),
  password: yup
    .string()
    .min(8, 'Le mot de passe doit faire au moins 8 caractères')
    .max(20, 'Le mot de passe ne doit pas dépasser 20 caractères')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .matches(/[@$!%*?&]/, 'Le mot de passe doit contenir un caractère spécial (@$!%*?&)')
    .required('Le mot de passe est requis'),
});

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showRules, setShowRules] = useState(false);
  const passwordValue = watch('password', '');
  const allRulesValid = passwordRules.every(rule => rule.test(passwordValue));

  const onSubmit = (data) => {
    alert('Formulaire valide !', data);
    reset();
    setShowRules(false);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-content">
        <div className="welcome-message">Bienvenue à Simplon</div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input
            type="password"
            {...register('password')}
            onFocus={() => setShowRules(true)}
            onBlur={() => setShowRules(false)}
          />
          {showRules && (
            <div className="password-rules">
              <strong>Règles pour le mot de passe :</strong>
              <ul>
                {passwordRules.map((rule, idx) => (
                  <li key={idx} className={rule.test(passwordValue) ? 'rule-checked' : ''}>
                    {rule.label}
                    {rule.test(passwordValue) && (
                      <span className="checkmark">&#10003;</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="submit-button"
          style={{
            background: allRulesValid
              ? 'linear-gradient(90deg, #2563eb 60%, #059669 100%)'
              : '',
            opacity: allRulesValid ? 1 : 0.6,
            pointerEvents: allRulesValid ? 'auto' : 'none',
            transition: 'background 0.2s, opacity 0.2s',
          }}
          disabled={!allRulesValid}
        >
          Connexion
        </button>
      </div>
    </form>
  );
};

export default UserProfile;