import { useEffect, useState } from 'react';
import { url, Navigate } from './App';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useHistory } from "react-router-dom";

export function Furniture({state,dispatch}) {

  const [furniture, setFurniture] = useState(null);
  const history = useHistory();
  useEffect(() => {
    fetch(`${url}/furniture`)
      .then((data) => data.json())
      .then((data2) => setFurniture(data2));
  }, []);



  return <div>
    <Navigate /> 
      <Button onClick={() =>{
        dispatch({type:"updateOrderAmount", payload: state.itemsOrdered.map(({price}) => price).reduce((price,sum) => price + sum,0) } ) ;
        if(state.orderCount>0){
          history.push('/checkout')
        }
      } } style={{marginLeft: '88%',marginBottom: '10px', color: 'green'}}  variant="text">checkout 
      <Badge  badgeContent={state.orderCount} color="secondary">
      <ShoppingCartOutlinedIcon             
   fontSize="large" />
    </Badge>
    </Button>
    
    <div className='item-list'>
    { furniture ? furniture.map((item) => <Item key={item._id} state={state}  dispatch={dispatch} name={item.name} pic={item.picUrl} price={item.price} />) : '' }
    </div>
  </div>;

}

export function Item({ name,pic,price,state,dispatch  }){

  const [orderState,setOrderState] = useState(true);

  const styles = {
      height: '550px',
      width: '500px',
      objectFit: 'contain'
  }  

  const itemDetails = {
     name,
     pic,
     price,
  }


  function handleCart(){
    if(orderState){
      dispatch({ type: "increment" });
      dispatch({ type: "addItem", payload: [...state.itemsOrdered, itemDetails] });

    }else {

      dispatch({ type: "decrement" });
      const array = state.itemsOrdered;
      dispatch({ type: "removeItem", payload: array.filter((item) => item.name !== itemDetails.name ) });

    }
    setOrderState(!orderState);
  }
  const stylesButton = {marginRight: '20px', marginTop: '20px' , color: orderState ? 'blue' : 'black' };

    return <div className='item'>
        <img className='item-image' style={styles} src={pic} alt={name} />
        <div className='item-details'>
        <div>
        <p className='item-name' >{name}</p>
        <p className='item-price' >₹{price}</p>
        </div>
       <div>
       <Button style={stylesButton} onClick={handleCart} variant="outlined">{ orderState ? 'Order' : 'Remove' }</Button>
       </div>
       </div>
        </div>

}