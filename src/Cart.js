import './App.css';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import { FaLongArrowAltRight, FaRupeeSign, FaUser, FaHeart} from "react-icons/fa";
// import { TiThMenu } from "react-icons/ti";
// import { IoMdStar } from "react-icons/io";
import { BsCart2, BsCurrencyDollar, BsGraphUpArrow } from "react-icons/bs";
import {useParams} from 'react-router-dom';
// import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addToCart, removeFromCart } from "./App/reducer/counterSlice";

function Cart(){

  // const {id} = useParams();
  const { productId } = useParams();

  // const [cartItems, setCartItems] = useState([]);
  const item=useSelector((state)=>state.counter.item);
  const cartProduct = useSelector((state) => state.counter.cartproduct);
  const count= useSelector((state)=> state.counter.value);
  const dispatch = useDispatch();

  console.log(cartProduct);

  // useEffect(() => {
  //   axios.get(`https://dummyjson.com/products/${productId}`)
  //     .then(function (response) {
  //       console.log(response);
  //       setCartItems(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [productId]);

    const remove=(index)=>{
      dispatch(removeFromCart(index));
    }

    const handleIncrement=(index)=>{
      dispatch(increment(index));
    }

    const handledecrement=(index)=>{
      dispatch(decrement(index));
    }

    const refresh = () => {
        window.location.reload();
    };

    const subtotal = cartProduct.reduce((total, item) => total + item.price * item.qty, 0);
    const discount = 0.20; // 12% discount
    const gst = 0.12; // 12% discount
    const totalWithDiscount = cartProduct.reduce((total, item) => total + (item.price * (1 - discount)) * item.qty, 0);
    const gstAmount = totalWithDiscount * gst;
    const totalAmount = totalWithDiscount + gstAmount;

    return(
        <>
            <header>
              <div className="top_header bgCream">
                <Container>
                  <div className="top_header_info">
                    <div className="top_left_content">
                      <p>
                        Good luck with shopping. Call us free 24/7 : (555)
                        172-244-7888
                      </p>
                    </div>
                    <div className="top_right_content">
                      <div className="right_info">
                        <i>
                          <FaUser></FaUser>
                        </i>
                        <h5>My Account</h5>
                      </div>
                      <div className="right_info">
                        <i>
                          <FaUser></FaUser>
                        </i>
                        <h5>Compare</h5>
                      </div>
                      <div className="right_info">
                        <i>
                          <FaHeart></FaHeart>
                        </i>
                        <h5>Whishlist</h5>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
  
              <div className="logo_header">
                <Container>
                  <div className="logo_header_info">
                    <div className="logo_img" onClick={refresh}>
                      <img src={require(`./image/logo.png`)}></img>
                    </div>
                    <div className="logo_info">
                      <input type="text" placeholder="Search Products.."></input>
                      <button>Search</button>
                    </div>
                    <div className="logo_right_info">
                      <div className="infos">
                        <i>
                          <BsCart2></BsCart2>
                        </i>
                        <div className="info">
                          <span>{count} items</span>
                          <br/>
                          <strong>My Cart</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </header>

            <div className='banner'>
                <div className='bgCream'>
                    <div className='spacer'>
                        <div className='content'>
                            <h2>Cart</h2>
                            <span>Home</span><a>/</a><label>Cart</label>
                        </div>
                    </div>
                </div>
            </div>


              <Container>
        <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              cartProduct.map((ele,ind)=>{
                return(
                  <>
                    <tr className='cart_row'>
                      <td><button onClick={()=>remove(ele)}>x</button></td>
                      <td><img src={ele.thumbnail}></img></td>
                      <td>{ele.title}</td>
                      <td>${ele.price}</td>
                      <td><butoon onClick={()=>handleIncrement(ele)}>+</butoon> {ele.qty} <butoon onClick={()=>handledecrement(ele)}>-</butoon></td>
                      <td>${ele.price * ele.qty}</td>
                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </Table>


        <center>
            <div className='bill_box'>
              <h3>CART TOTALS</h3>
              <Table striped bordered hover className='bill'>
              <tbody>
                  <tr>
                    <th className='head'>Subtotal</th>
                    <td>{subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th className='head'>Discount 20%</th>
                    <td>{totalWithDiscount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th className='head'>GST 12%</th>
                    <td>{gstAmount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th className='head'>Total</th>
                    <td>{totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>  
              </Table>
            </div>
        </center>

        </Row>
      </Container>

        </>
    )
}

export default Cart;