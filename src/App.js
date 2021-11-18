import React from "react";
import Cart from "./Components/Cart";
import DataContext from "./Context/Datacontext";
import SearchContext from "./Context/SearchContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./Components/Products";
import { AuthContext } from "./Firebase/AuthProvider";
import Navbar from "./Components/Navbar";
import Cake from "./Pages/Cake";
import Cupcake from "./Pages/Cupcake";
import Bread from "./Pages/Bread";
import Userlogins from "./Components/Userlogins";
import { Copyright } from "./Components/Copyright";
import { Box } from "@material-ui/core";
function App() {
  return (
    <AuthContext>
      <DataContext>
        <SearchContext>
          <Router>
            <Navbar />
            <Userlogins />
            <Switch>
              <Route exact path="/" component={Products} />
              <Route path="/cart" component={Cart} />
              <Route path="/cake" component={Cake} />
              <Route path="/cupcake" component={Cupcake} />
              <Route path="/bread" component={Bread} />
            </Switch>
            <Box mt={5} mb={3}>
              <Copyright />
            </Box>
          </Router>
        </SearchContext>
      </DataContext>
    </AuthContext>
  );
}

export default App;
