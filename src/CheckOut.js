import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Calendar from "react-calendar";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import 'react-calendar/dist/Calendar.css';

export function CheckOut({ state, dispatch }) {

  const history = useHistory();

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = useFormik(
    {
      initialValues: { name: '', email: '', phone: '' },
      validationSchema: formValidationSchema,

      onSubmit: async (values) => {
        dispatch({ type: "updateOrderAmount", payload: state.orderAmount * state.days });
        dispatch({ type: "updateCustomer", payload: values });
        history.push('/placeorder');

      }
    });


  const onChange = (dateRange) => {
    dispatch({ type: "updateDateRange", payload: dateRange });
    dispatch({ type: "updateDays", payload: Math.round(Math.abs((dateRange[1] - dateRange[0]) / (24 * 60 * 60 * 1000))) });
  };

  return <div className='order-item-list'>
    <div>
    <h3>Ordered Items</h3>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {state.itemsOrdered.map((item) => <ListItemEach key={item.name} name={item.name} pic={item.pic} price={item.price} />)}
    </List>
    <ListItem alignItems="center">
      <ListItemText style={{marginLeft: '110px'}}
        primary={'Total Amount per day : ₹' + state.orderAmount} />
    </ListItem>
    </div>
    <div>
      <p style={{fontWeight: 300}}>Select Date range for Hiring :</p>
      <Calendar selectRange minDate={new Date()} onChange={onChange} value={state.dateRange} />
      <form onSubmit={handleSubmit}>
        <div className='customer-details'>

          <TextField name='name'
            onBlur={handleBlur}
            helperText={errors.name && touched.name && errors.name}
            value={values.name}
            onChange={handleChange}
            id="name"
            label="name"
            variant="standard" />

          <TextField name='phone'
            onBlur={handleBlur}
            helperText={errors.phone && touched.phone && errors.phone}
            value={values.phone}
            onChange={handleChange}
            id="phone"
            label="phone"
            variant="standard" />

          <TextField name='email'
            onBlur={handleBlur}
            helperText={errors.email && touched.email && errors.email}
            value={values.email}
            onChange={handleChange}
            id="email"
            label="email"
            variant="standard" />

          <Button variant="contained" type='submit' color="success">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  </div>;

}

function ListItemEach({name,pic,price}){

  return <ListItem alignItems="flex-start">
   
  <ListItemAvatar>
    <Avatar alt={name} src={pic}/>
  </ListItemAvatar>
  <ListItemText
    primary={name}
    secondary={
      <>
        
      <span style={{marginLeft: '223px'}}>₹{price}</span>  
      </>
    }
  />
  </ListItem>
  
  
  }


  const formValidationSchema = yup.object({
    name: yup.string().min(4,'Minimum 4 characters required!!').required('required'),                 
    phone: yup.number().required('required'),
    email: yup.string().required('required'),
    
  });