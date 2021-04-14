import React, { useState } from "react";

const CartItem = ({ product })=>{
    // const [item,setItem] = useState({
    //     price: props.product.price,
    //     title: props.product.name,
    //     qty: props.product.quantity,
    //     img: props.product.image
    // });
    // const {product}=props;
    // const {price,title,qty,img}=props.product;
    // function increaseItem(){
    //     setItem((prevItem)=>{
    //         return ({
    //             price: prevItem.price,
    //             title: prevItem.title,
    //             qty: prevItem.qty+1,
    //             img: prevItem.img
    //         });
    //     });
    // }
    // function decreaseItem(){
    //     setItem((prevItem)=>{
    //         if(item.qty === 0){
    //             return ({
    //                 price: prevItem.price,
    //                 title: prevItem.title,
    //                 qty: 0,
    //                 img: prevItem.img
    //             });
    //         } else {
    //             return {
    //                 price: prevItem.price,
    //                 title: prevItem.title,
    //                 qty: prevItem.qty-1,
    //                 img: prevItem.img
    //             }
    //         }
    //     });
    // }
    // // function deleteItem(){
    // //     console.log("deleted");
    // // }

    // const [value, setValue] = useState(qty)

    // const onChangeHandler = (e) => {
    //     setValue(e.target.value)
    //     // [e.target.name] = e.target.value
    // }

    // const increaseQty = () => {
    //     setValue(value + 1)
    // }

    return ( 
    <div className="cart-item">
        <div className="left-block">
            <img className="item-image" style={styles.image} src={product.image} />
        </div>
        <div className="right-block">
            <div className="item-title" style={{fontSize: 25}}>{product.name}</div>
            <div style={{color: "#777"}}>Rs {product.price}</div>
            <div style={{color: '#777'}}>Qty: {product.quantity}</div>
            {/* <input style={{border: 'none', width: '30px', height: '30px'}} placeholder='Qty' value={value} name='qty' onChange={(e) => onChangeHandler(e)} /> */}
            <div className="cart-item-actions">
                {/*Buttons*/}
                {/* <img onClick={() => {
                    increaseQty()
                }} alt="increase" className="action-icons" src="https://t4.ftcdn.net/jpg/01/07/62/07/240_F_107620769_UwNVSoXnKS4VNcOKoZjPohlEPn83oE38.jpg" /> */}
                
                {/*<img onClick={()=>{
                    props.handleIncreaseQty(props.product)
                    increaseItem() }} alt="increase" className="action-icons" src="https://t4.ftcdn.net/jpg/01/07/62/07/240_F_107620769_UwNVSoXnKS4VNcOKoZjPohlEPn83oE38.jpg" />
                <img onClick={()=>{
                    props.handleDecreaseQty(props.product)
                    decreaseItem() }} alt="decrease" className="action-icons" src="https://t3.ftcdn.net/jpg/03/73/49/86/240_F_373498649_nBxauQ0ipBSVrVcMpWWVmTpXu3BLvRyY.jpg" />
                <img onClick={()=>props.handleDeleteProduct(props.product.id)} alt="delete" className="action-icons" src="https://t4.ftcdn.net/jpg/01/90/89/15/240_F_190891550_N7uKp2aHE3mOc20dmtDytj7atgvbhdOu.jpg" />*/}
            </div>
        </div>
    </div>
        
    );
}
const styles ={
    image: {
        height: 120,
        width: 120
    }
}
export default CartItem;