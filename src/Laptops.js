import { useEffect, useState } from 'react';
import { url, Navigate } from './App';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Item } from './Furniture';
import { useHistory } from "react-router-dom";
export function Laptops({ state, dispatch }) {

    const [laptops, setLaptops] = useState(null);
    const history = useHistory();

    useEffect(() => {
      fetch(`${url}/laptops`)
        .then((data) => data.json())
        .then((data2) => setLaptops(data2));
    }, []);
  
  
  
    return <div>
      <Navigate />
      <Button onClick={() =>{
        dispatch({type:"updateOrderAmount", payload: state.itemsOrdered.map(({price}) => price).reduce((price,sum) => price + sum,0) } ) ;
        if(state.orderCount>0){
          history.push('/checkout')
        }
      } }  style={{ marginLeft: '88%', marginBottom: '10px', color: 'green' }} variant="text">checkout 
        <Badge badgeContent={state.orderCount} color="secondary">
          <ShoppingCartOutlinedIcon
            fontSize="large" />
        </Badge>
      </Button>
  
      <div className='item-list'>
        {laptops ? laptops.map((item) => <Item key={item._id} state={state} dispatch={dispatch} name={item.name} pic={item.picUrl} price={item.price} />) : ''}
      </div>
    </div>;

}
