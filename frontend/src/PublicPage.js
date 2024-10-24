import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import './styles/publicPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PublicPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  // Si el usuario ya está autenticado, redirigirlo a la página privada
  if (isAuthenticated) {
    return <Navigate to="/private" />;
  }

  return (
    <div className='cuerpo'>
      <div className='container-custom'>
        <h1>Task Manager con React - Programacion 3</h1>
        <h3>Emiliano Lerin - Analista en sistemas</h3>
        <button className='btn btn-custom' onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    </div>
  );
};

export default PublicPage;