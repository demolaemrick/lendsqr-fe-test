import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
    navigate('/dashboard/users');
  };

  return (
    <div className="login-page">
      <div className="login-page__left">
        <div className="login-page__logo">
          <img src="/union.svg" alt="Lendsqr" />
          <span className="login-page__logo-text">lendsqr</span>
        </div>
        <div className="login-page__illustration">
          <img src="/pablo-sign-in.svg" alt="Welcome illustration" />
        </div>
      </div>

      <div className="login-page__right">
        <div className="login-page__form-container">
          <h1 className="login-page__title">Welcome!</h1>
          <p className="login-page__subtitle">Enter details to login.</p>

          <form className="login-page__form" onSubmit={handleSubmit}>
            <div className="login-page__input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-page__input"
                required
              />
            </div>

            <div className="login-page__input-group login-page__input-group--password">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-page__input"
                required
              />
              <button
                type="button"
                className="login-page__show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            <a href="#" className="login-page__forgot-password">
              FORGOT PASSWORD?
            </a>

            <button type="submit" className="login-page__submit">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
