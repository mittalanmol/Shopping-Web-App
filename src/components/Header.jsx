// import React from "react";
// import { Link } from "react-router-dom";
// import { FaBagShopping } from "react-icons/fa6";
// import Venialogo from "../assets/venia-logo.png";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Header() {
//   return (
//     <header>
//       {/* <div className='logo_container'>
//         <a href='#'>
//           <img className='myntra_home' src={Venialogo} alt='Logo' />
//         </a>
//       </div> */}
//       <nav className='nav_bar'>
//         <a href='#'>Home</a>
//         <a href='#'>Shop</a>
//         <a href='#'>Women</a>
//         <a href='#'>Men</a>
//         <a href='#'>Jewellery</a>
//         <a href='#'>Electronics</a>
//       </nav>

//       <div className='action_bar'>
//         <a className='action_container' href='#bag'>
//           <FaBagShopping />
//           <span className='action_name'>Bag</span>
//           <span className='bag-item-count'>0</span>
//         </a>
//       </div>
//     </header>
//   );
// }

// export default Header;

import React from "react";
import { Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import Venialogo from "../assets/venia-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useSelector } from "react-redux";

function Header() {
  const cartItems = useSelector((state) => state.cart.items); // cart is the name of our Slice and uske andr items ka array pdda hai
  return (
    <header>
      {/* Logo section */}
      <div className='logo_container'>
        <Link to='/'>
          <img className='myntra_home' src={Venialogo} alt='Logo' />
        </Link>
      </div>

      {/* Navigation links */}
      <nav className='nav_bar'>
        <Link to='/'>Home</Link>
        <Link to='/shop'>Shop</Link>
        <Link to="/women's-clothing">Women</Link>
        <Link to="/men's-clothing">Men</Link>
        <Link to='/jewelery'>Jewelery</Link>
        <Link to='/electronics'>Electronics</Link>
      </nav>
      {/* Action bar for shopping bag */}
      <div className='action_bar'>
        <Link className='action_container' to='/bag'>
          <FaBagShopping />
          <span className='action_name'>Bag</span>
          <span className='bag-item-count'>{cartItems.length}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
