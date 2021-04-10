import logo from './logo.svg';


import LoginPage from './Components/LoginPage';
import { BrowserRouter } from "react-router-dom";
import Registration from './Components/Registration';
   

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
       {/* <LoginPage/> */}
       <Registration/>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
