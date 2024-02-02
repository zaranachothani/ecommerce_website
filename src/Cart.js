import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaLongArrowAltRight, FaRupeeSign, FaUser, FaHeart} from "react-icons/fa";
// import { TiThMenu } from "react-icons/ti";
// import { IoMdStar } from "react-icons/io";
import { BsCart2, BsCurrencyDollar, BsGraphUpArrow } from "react-icons/bs";
// import {useParams} from 'react-router-dom';
// import Spinner from 'react-bootstrap/Spinner';

function Cart({cartItems}){

  // const [cartItems, setCartItems] = useState([]);

    const refresh = () => {
        window.location.reload();
    };

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
                          <span>0 items</span>
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
          <div>
          {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <Col key={index} md={4}>
                  <p>{item.name}</p>
                  {/* Add more details or components as needed */}
                </Col>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </Row>
      </Container>

        </>
    )
}

export default Cart;