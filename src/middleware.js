import Login from "./componets/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ListVidioAdmin from "./componets/ListVidio";
import ListUser from "./componets/ListUser";
import LoginUser from "./componets/AuthUsers/LoginUser";
import RegistrasiUser from "./componets/AuthUsers/RegistrasiUser";
import ListVidioUser from "./componets/PageListVidio/index";
import SoalQuiz from "./componets/SoalQuiz";
import Skor from "./componets/Skor/Skor";
const Middleware =() =>{
  return(
      <Router>
          <Switch>
              <Route exact path="/" render={() => <LoginUser/>} />
               <Route exact path="/login-admin" render={() => <Login/>} />
               <Route exact path="/list-vidi0-admin" render={() => <ListVidioAdmin/>} />
               <Route exact path="/list-user" render={() => <ListUser/>} />
               <Route exact path="/registrasi-user" render={() => <RegistrasiUser/>} />
               <Route exact path="/listvidio-user" render={() => <ListVidioUser/>} />
               <Route exact path="/quiz" render={() => <SoalQuiz/>} />
               <Route exact path="/Skor" render={() => <Skor/>} />
               </Switch>
      </Router>

  )
}

export default Middleware;