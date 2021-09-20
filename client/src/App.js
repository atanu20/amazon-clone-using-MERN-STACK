import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';

import Error from './pages/Error'
import './App.css'
import Navbar from './component/navbar/Navbar';
import Category from './pages/category/Category';
import Cart from './pages/cart/Cart';
import CartDetails from './pages/cart/CartDetails';
import All_products from './pages/all-product/All_products';
import EditAddress from './pages/cart/EditAddress';
import MyAccount from './pages/account/MyAccount';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductDetails from './pages/all-product/ProductDetails';
import { ConText } from './context/DataContext'
import Success from './pages/cart/Success';
import OrderDetails from './pages/account/OrderDetails';
import Wishlist from './pages/account/Wishlist';
import OrderTracker from './pages/account/OrderTracker';
import Dashboard from './pages/admin/Dashboard';

const App = () => {
  const [showAdmin, setShowAdmin] = React.useState(false);

  const AmazonUserId=localStorage.getItem('AmazonUserId')

  React.useEffect(() => {
    if (window.location.href.toString().includes("/admin")) {
      setShowAdmin(true)
    }
  },[]);

  
    

  
  return (
    <>
  <ConText>
    {
      showAdmin ?(
        <>
        {/* <Navbar/> */}
        <Switch>
        <Route exact path="/admin" component={Dashboard} />
        </Switch>

        </>
      ) :(
        <>
 <Navbar/>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path ="/" component={Home}/>
      <Route exact path ="/category/:name/:id" component={Category}/>
      <Route exact path ="/cart" component={Cart}/>
      <Route exact path ="/cart-details" component={CartDetails}/>
      <Route exact path="/products" component={All_products}/>
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Route exact path="/edit_address/:id" component={EditAddress} />
      <Route exact path="/account" component={MyAccount} />
      <Route exact path="/success" component={Success}/>
      <Route exact path="/order-details/:id" component={OrderDetails} />
      <Route exact path="/wishlist" component={Wishlist} />
      <Route exact path="/order-tracker" component={OrderTracker} />
      <Route component={Error} />
    </Switch>
        </>
      )
    }
  
    </ConText>
     

    </>
  )
}

export default App;



