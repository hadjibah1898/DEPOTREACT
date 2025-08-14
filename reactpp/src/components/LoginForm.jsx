import React from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="form-card">
      <h1 className="form-title">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" {...register("email")} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="password"  className="form-label">Mot de passe</label>
          <input type="password" id="password" {...register("password")} className="form-input" />
        </div>
        <input type="submit" className="form-submit" value="Login" />
      </form>
    </div>
  );
}
