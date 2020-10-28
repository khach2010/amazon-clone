import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import './Payment.css';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Adress</h3>
          </div>
          <div className='payment__adress'>
            <p>{user?.email}</p>
            <p>123 React adress</p>
            <p>Rotterdam , Netherlands</p>
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review Items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(({ id, title, image, price, rating }) => (
              <CheckoutProduct
                id={id}
                title={title}
                image={image}
                price={price}
                rating={rating}
              />
            ))}
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'></div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
