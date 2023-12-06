import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import ContextProvider from './context/ContextProvider';

function App() {
  const { user } = useUser();
  const navigate = useNavigate();
  if (!user) {
    navigate('/sign-in');
    return null;
  } 
  return (
    <>
    <ContextProvider>
      <HomePage />
    </ContextProvider>
    </>
  );
}

export default App;
