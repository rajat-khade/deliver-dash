import React from "react";
import { useHistory } from "react-router";
function Navbar({cartTotal}){
    const history = useHistory()
    return (
        <div style={styles.nav}>
            <h2 style={{marginRight:'82%',color:'white',fontWeight:'600',cursor:'pointer'}} onClick = {()=>history.push("./login")}>DeliverDash</h2>
            <div style={styles.cartIconContainer}>
                <i class="fas fa-shopping-cart fa-2x" style={styles.cartIcon}></i>
                <span style={styles.cartCount}>{cartTotal}</span>
            </div>
        </div>
    );
}
export default Navbar;

const styles = {
    cartIcon: {
        color: 'white',
        height: 32,
        marginRight: 30
    },
    nav: {
        height: 70,
        background: "#000",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 0
    },
    cartIconContainer: {
        position: "relative"
    },
    cartCount: {
        background: "#f4f3f3",
        borderRadius: "60%",
        marginRight: 7,
        padding: "4px 8px",
        fontWeight: 600,
        position: "absolute",
        right: 0,
        top: -9
    }
};