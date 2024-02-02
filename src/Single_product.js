import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaLongArrowAltRight, FaRupeeSign, FaUser, FaHeart} from "react-icons/fa";
// import { TiThMenu } from "react-icons/ti";
// import { IoMdStar } from "react-icons/io";
import { BsCart2, BsCurrencyDollar, BsGraphUpArrow } from "react-icons/bs";
import {useParams} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Cart from './Cart';


function Single_product(){

    const {id} = useParams();

    const [product,setProduct]= useState({"thumbnail":"", "image":[]});
    const [message, setMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [Loading,setLoading] = useState(true);
    const [isCartVisible, setCartVisibility] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
      axios.get(`https://dummyjson.com/products/${id}`)
        .then(function (response) {
          console.log(response);
          setProduct(response.data);
          setSelectedImage(response.data.thumbnail);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [id]);

        if (!product) {
            return <p>Loading...</p>; 
        }

        const refresh = () => {
            window.location.reload();
        };

        const AddToCart = () => {
          setCartItems((prevItems) => [...prevItems, product]);
          setMessage('Item added to the cart.');
        };

        const handleImage = (image) => {
          setSelectedImage(image);
        };
      

    return(
        <>
          {
            Loading?(
              <>
             <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
            ):(
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
                      <div className="infos"  onClick={() => setCartVisibility(true)}>
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
                            <h2>Product</h2>
                            <span>Home</span><a>/</a><label>Product</label>
                        </div>
                    </div>
                </div>
            </div>
  
          <Container>
              <Row className='product_row'>
                <Col lg={6}>
                  <div className='thumbnail_img'>
                    <img src={selectedImage} alt='Product Thumbnail' /> 
                    <div className='thumbs'>
                      {
                        product.images && product.images.map((image, index) => (
                          <img key={index} src={image} alt={`Product Image ${index + 1}`} onClick={() => handleImage(image)}></img>
                        ))
                      }
                    </div>
                  </div>
                </Col>
                  <Col lg={6}>
                      <div className='product_details'>
                          <h2>{product.title}</h2>
                          <div className='product_price'>
                            <i><BsCurrencyDollar></BsCurrencyDollar></i>
                            <span>{product.price}</span>
                          </div>
                          <p className='disc'>{product.description}</p>
                          {/* <a className="rating">{product.rating}<i><IoMdStar></IoMdStar></i></a><br/> */}
                          <p className='stock'>{product.stock} in stock</p>
                          <div className='qty'>
                            <span>Qty :</span>
                            <a href='#'>1</a>
                            <button className='Add cart' onClick={AddToCart}>
                              Add To Cart
                            </button>
                          </div>
                          <div className='wishlist'>
                              <i><FaHeart></FaHeart></i><span>Add To Wishlist</span>
                              <i className='right'><BsGraphUpArrow></BsGraphUpArrow></i><span>Compare</span>
                          </div>
                      </div>
                      
                  </Col>
              </Row> 
          </Container> 
  
              {message && <p className="message">{message}</p>}
              </>
            )
          }
        
        </>
    )
}

export default Single_product;