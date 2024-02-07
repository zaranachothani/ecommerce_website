import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from "./App/reducer/counterSlice";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsCart2, BsCurrencyDollar, BsGraphUpArrow } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap';

const Cart1 = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);

        if (!response.data) {
          throw new Error('No data received');
        }

        setCartItems(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const refresh = () => {
    window.location.reload();
  };

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <header>
        {/* ... (header code) */}
      </header>

      <div className='banner'>
        {/* ... (banner code) */}
      </div>

      <Container>
        {/* ... (your component content) */}

        <div className='product_details'>
          <h2>{cartItems.title}</h2>
          <div className='product_price'>
            <i><BsCurrencyDollar></BsCurrencyDollar></i>
            <span>{cartItems.price}</span>
          </div>
          <p className='disc'>{cartItems.description}</p>
          <p className='stock'>{cartItems.stock} in stock</p>
          <div className='qty'>
            <span>Qty :</span>
            <a href='#'>1</a>
            <button className='Add cart' onClick={handleIncrement}>
              Increment
            </button>
            <button className='Add cart' onClick={handleDecrement}>
              Decrement
            </button>
          </div>
          {/* ... (other details) */}
        </div>

        {/* ... (other content) */}
      </Container>
    </>
  );
};

export default Cart1;
