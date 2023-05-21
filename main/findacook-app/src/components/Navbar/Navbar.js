import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Style.css'
import { useRef } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import { CartContext } from '../../CartContext';
import { Modal } from "react-bootstrap";
// import DemoCart from '../Demo/DemoCart';
import { useSelector } from 'react-redux';
import LogoutButton from '../LogoutOut';

function Navbar() {
	// const cart = useContext(CartContext);

    const { cart } = useSelector(state => state.cart)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	// const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

    const [firstname, setFirstName] = useState("")
    axios.defaults.withCredentials = true
    useEffect(()=> {
        axios.get('https://findacook-web.onrender.com/api/user/userinfo')
        .then((res) => {
            setFirstName(res.data.message);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [])

	return (
		<>
		<header>
			{/* <div className='navLogo'>
            <img src="../images/logo-new-edit-01.png"/>
            </div>  */}
            {/* <h3>Find A Cook</h3> */}
            <a href='/'>
            <img src="/images/logo-new-edit-01.png"/>
            </a>
            {/* <img src="../images/logo-new-edit-01.png"/> */}
			<nav ref={navRef}>

<h5></h5>
				<a href="/home">Discover Cooks</a>
				<a href="/#">My Bookings</a>
				{/* <a href="/#">Temi</a> */}


                {/* name of user */}


                <Link to='/cart'>
                <FaShoppingCart />{' '}Cart <span>({cart.length})</span>
                </Link>{' '}

                <LogoutButton/>
				{/* <a href="/#"><FaShoppingCart /></a> */}
				{/* <Link onClick={handleShow}><FaShoppingCart />Cart ({productsCount} Items)</Link> */}
				{/* <button><FaShoppingCart /></button> */}
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes /> 
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>

{/* <Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
		<Modal.Body>
		{productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map( (currentProduct, idx) => (
                                <DemoCart key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></DemoCart>
								// <h1>{currentProduct.id}</h1>
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            <button variant="success" onClick={checkout}>
                                Purchase items!
                            </button>
                        </>
                    :
                        <h1>There are no items in your cart!</h1>
                    }
        </Modal.Body>
	</Modal> */}
	</>
	);
}

export default Navbar