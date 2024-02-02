import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { FaUser,FaHeart  } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import React, { useState } from 'react';

function Header(){

    const [search, setsearch] = useState("");
    const [store,setstore] =useState([]);

    const searchHandler = () => {
        var data = store.filter((ele, index) => {
            return ele.task1 === search;
        });        
        setsearch('');
    };

    return(
        <>
            <header>
                <div className='top_header bgCream'>
                    <Container>
                        <div className='top_header_info'>
                            <div className='top_left_content'>
                                <p>Good luck with shopping. Call us free 24/7 : (555) 172-244-7888</p>
                            </div>
                            <div className='top_right_content'>
                                <div className='right_info'>
                                    <i><FaUser></FaUser></i>
                                    <h5>My Account</h5>
                                </div>
                                <div className='right_info'>
                                    <i><FaUser></FaUser></i>
                                    <h5>Compare</h5>
                                </div>
                                <div className='right_info'>
                                    <i><FaHeart ></FaHeart></i>
                                    <h5>Whishlist</h5>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

                <div className='logo_header'>
                    <Container>
                        <div className='logo_header_info'>
                            <div className='logo_img'>
                                <img src={require(`./image/logo.png`)}></img>
                            </div>
                            <div className='logo_info'>
                                <input type='text' placeholder='Search Products..' onChange={(e) => setsearch(e.target.value)}></input>
                                <button onClick={searchHandler}>Search</button>
                            </div>
                            <div className='logo_right_info'>
                                <div className='infos'>
                                    <i><BsCart2></BsCart2></i>
                                    <div className='info'>
                                        <span>0 items</span><br/>
                                        <strong>My Cart</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

            </header>
        </>
    )
}

export default Header;