
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../redux/slices/authSlice';

import { jwtDecode } from "jwt-decode";

export default function LoginGoogle({ setIsSignInOpen }) {
  const dispatch = useDispatch();
  const handleSubmitButton = () => {
    const newTab = window.open('https://twosportapi.azurewebsites.net/api/Auth/oauth-login', '_blank');

    window.addEventListener('message', (event) => {
      if (event.origin === 'https://twosportapi.azurewebsites.net/') {
        const { token, refreshToken } = event.data;
        console.log(token, refreshToken);
        if (token && refreshToken) {
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          const decoded = jwtDecode(token);
          dispatch(login(decoded));
          // console.log('Login successful', decoded);
          setIsSignInOpen(false);
          newTab.close();
        }
      }
    }, { once: true }); 
  };
  return (
    <>
                  <button
                    onClick={handleSubmitButton}
                    className="border-zinc-400 border-2 rounded-lg"
                  > Login with Google</button>
                 
    </>
  );
}
