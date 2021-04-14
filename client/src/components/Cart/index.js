import React, {useState} from "react";
import ReactDOM from "react-dom";
import Cart from "./Cart";
import Navbar from "./Navbar"

const CartSplash = () => {

    // console.log("welcome to cart",props.location.state.cart)
    const [forceRerender, setForceRerender] = React.useState(true);

// ...put this line where you want to force a rerender

const [products, setProducts] = useState([]);

// useEffect(async () => {
//   const productList = await axios({url: `/api/${type}/cart/${id}`, baseURL: 'http://localhost:5000'})
//   setProducts(...productList.data)
//   console.log(productList.data)
// }, [])

function handleIncreaseQty(product){
  const index = products.indexOf(product);
  products[index].qty += 1;
  setProducts(products);
  console.log(product);
  setForceRerender(!forceRerender);
}
function handleDecreaseQty(product){
  const index = products.indexOf(product);
  if(products[index].qty===0){
      return;
  }
  products[index].qty -= 1;
  return (
    setProducts(()=>{return products})
  );
  
  console.log(product);
}
function handleDeleteProduct(id){
  const items = products.filter((item)=> item.id !== id);
  setProducts(()=>items);
}
function getCount(){
  let counter =0;
  products.forEach((product)=>{
    counter += product.qty;
  })
  console.log(counter);
  return counter;
}
function getPrice(){
  let price =0;
  products.forEach((product)=>{
    price += parseInt(product.price)*(product.qty);
  })
  console.log(price);
  return price;
}

  return (
    <div className="cart-container">
      <Navbar count={getCount} />
      <Cart 
        type={'Customer'}
        id={'6064a220ace08e355c9daa0c'}
        handleIncreaseQty={handleIncreaseQty}
        handleDecreaseQty={handleDecreaseQty}
        handleDeleteProduct={handleDeleteProduct}
      />
      <h3>Price: {getPrice()}</h3>
    </div>
  );
}

export default CartSplash;
