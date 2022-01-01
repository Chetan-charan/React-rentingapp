import Button from '@mui/material/Button';
import './App.css';
import { Switch, Route, useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Furniture } from './Furniture';
import { Redirect } from 'react-router';
import { useReducer } from 'react';
import { Appliances } from './Appliances';
import { Fitness } from './Fitness';
import { Laptops } from './Laptops';
import { PlaceOrder } from './PlaceOrder';
import { CheckOut } from './CheckOut';

export const url = 'https://equipment-renting.herokuapp.com'



function App() {

  const reducer = (state, action) => {

    switch (action.type) {
      case "increment":
          return { ...state,orderCount: state.orderCount + 1 };
      case "decrement":
          return { ...state, orderCount: state.orderCount - 1 };
      case "addItem":
          return { ...state, itemsOrdered: action.payload };
      case "removeItem":
          return { ...state, itemsOrdered: action.payload };
      case "updateOrderAmount":
          return {...state, orderAmount: action.payload };
      case "updateCustomer":
          return {...state, customerDetails: action.payload };
      case "updateDays":
          return {...state, days: action.payload };
      case "updateDateRange":
          return {...state, dateRange: action.payload };
      case "settoInitial":
          return {initialState};
      default:
        return state;
    }
  };

  const initialState = {itemsOrdered: [] ,orderCount: 0, orderAmount: 0,customerDetails: {},days: 0,dateRange: [new Date(),new Date()] };
  const [state,dispatch] = useReducer(reducer,initialState);

    return  <div className="App">
            <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/Furniture">
          <Furniture state={state} dispatch={dispatch} />
        </Route>
        <Route path="/Appliances">
          <Appliances state={state} dispatch={dispatch} />
        </Route>
        <Route path="/fitness">
          <Fitness state={state} dispatch={dispatch} />
        </Route>
        <Route path="/laptops">
          <Laptops state={state} dispatch={dispatch}  />
        </Route>
        <Route path="/home">
        <Home/>
        </Route>
        <Route path="/checkout">
        <CheckOut state={state} dispatch={dispatch} />
        </Route>
        <Route path="/placeorder">
        <PlaceOrder state={state} dispatch={dispatch} />
        </Route>
        <Route path="/">
        <Redirect to='/home' />
        </Route>
        </Switch>
          
          </div>


}


function Home(){

  return <>
    <Navigate/>
  </>

}

function About(){

  return <div>
    <Navigate/>
  </div>

}



export function Navigate(){

  const history = useHistory();

      return  <AppBar style={{marginBottom:'24px'}} position="static">
                <Toolbar variant="dense">
                <Button onClick={()=> history.push('/') } variant="text" color='inherit'>Home</Button>
                <Button onClick={()=> history.push('/about') } variant="text" color='inherit'>About Us</Button>
                <Button onClick={()=> history.push('/Furniture') } variant="text" color='inherit'>Furniture</Button>
                <Button onClick={()=> history.push('/Appliances') } variant="text" color='inherit'>Appliances</Button>
                <Button onClick={()=> history.push('/fitness') } variant="text" color='inherit'>Fitness-FunZone</Button>
                <Button onClick={()=> history.push('/laptops') } variant="text" color='inherit'>Laptops</Button>
                </Toolbar>
              </AppBar> 

}


export default App;
