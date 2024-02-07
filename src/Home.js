import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaLongArrowAltRight, FaRupeeSign, FaUser, FaHeart} from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { IoMdStar } from "react-icons/io";
import { BsCart2, BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { incrementVal, decrement } from "./App/reducer/counterSlice";
import Cart from "./Cart";


function Home(props) {
  const [data, setdata] = useState([]);
  const [product, setProduct] = useState([]);
  const [search, setsearch] = useState("");
  const [store, setstore] = useState([]);
  const [message, setMessage] = useState("");
  const [Loading,setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(0);

  
  const count= useSelector((state)=> state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then(function (response) {
        console.log(response);
        setdata(response.data);
        setLoading(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    axios
      .get("https://dummyjson.com/products?limit=100")
      .then(function (response) {
        console.log(response.data.products);
        setProduct(response.data.products);
        setstore(response.data.products);
        setLoading(false)

        if (response.data.products.length === 0) {
          setMessage("No products available.");
        } else {
          setMessage("");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const searchHandler = () => {
    // var data = store.filter((ele, index) => {
    //   return ele.category === search;
    // });
    axios
      .get(`https://dummyjson.com/products/search?q=${search}`)
      .then(function (response) {
        console.log(response.data.products);
        setProduct(response.data.products);
        // setstore(response.data.products);
        setLoading(false)

        if (response.data.products.length === 0) {
          setMessage("No products available.");
        } else {
          setMessage("");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    // setProduct(data);
    setsearch("");
    if (data.length === 0) {
      setMessage("No products available for this category.");
    } else {
      setMessage("");
    }
  };

  const dispCategory = (category) => {
    var dispProduct = store.filter((ele, index) => {
      return ele.category === category;
    });
    setProduct(dispProduct);
    if (dispProduct.length === 0) {
      setMessage("No products available for this category.");
    } else {
      setMessage("");
    }
  };

  const cartClickHandle=()=>{
    if(cartItems === 0){
      alert("Yout cart is empty..");
    }
  }

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
    {
      Loading?(
          <>
              <div className="loader">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
          </>

      ):(
        <>
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
                    <input type="text" placeholder="Search Products.." value={search} onChange={(e) => setsearch(e.target.value)}
                    ></input>
                    <button onClick={searchHandler}>Search</button>
                  </div>
                  <div className="logo_right_info">
                  <Link to="/cart">
                    <div className="infos" onClick={cartClickHandle}>
                      <i>
                        <BsCart2></BsCart2>
                      </i>
                      <div className="info">
                        <span>{count} items</span>
                        <br />
                        <strong>My Cart</strong>
                      </div>
                    </div>
                  </Link>
                  </div>
                </div>
              </Container>
            </div>
          </header>

          <Container>
            <div className="all_content">
              <div className="category_area">
                <div className="category_sticky">
                  <div className="category_title">
                    <i>
                      <TiThMenu></TiThMenu>
                    </i>
                    <h5>ALL CATEGORIES</h5>
                  </div>
                  <ul className="categories">
                    {data.map((ele, ind) => {
                      return (
                        <li
                          className="category_name"
                          onClick={() => dispCategory(ele)}
                        >
                          <i>
                            <FaLongArrowAltRight></FaLongArrowAltRight>
                            <span>{ele}</span>
                          </i>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="product_area">
                <div className="product_container">
                  {product.map((ele, ind) => {
                    return (
                      <>
                        <Link to={`/product/${ele.id}`} key={ind}>
                          <div className="product_inner">
                            <div className="img_block">
                              <img src={ele.thumbnail}></img>
                            </div>
                            <div className="product_content">
                              <h5>{ele.title}</h5>
                              <p>{ele.description}</p>
                              <a className="rating" >
                                {ele.rating}
                                <i>
                                  <IoMdStar></IoMdStar>
                                </i>
                              </a>
                              <br></br>
                              {/* <span className="stock">Stock : {ele.stock}</span> */}
                              <div className="price_content">
                                <i>
                                  <BsCurrencyDollar></BsCurrencyDollar>
                                </i>
                                <span>{ele.price}</span>
                                <font>{ele.discountPercentage} % off</font>
                              </div>
                              <div className="Add">
                                <button>
                                  View Product
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </div>
                {message && <p className="message">{message}</p>}
              </div>
            </div>
          </Container>
        </>
        </>
      )
    }
      
    </>
  );
}

export default Home;
