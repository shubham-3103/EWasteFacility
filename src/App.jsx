import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <>
    <ContextProvider>
    <HomePage />
    </ContextProvider>
    </>
  );
}

export default App;
