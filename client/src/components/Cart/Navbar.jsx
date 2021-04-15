import React from "react";
function Navbar({cartTotal}){
    return (
        <div style={styles.nav}>
            <div style={styles.cartIconContainer}>
                <img style={styles.cartIcon} src="https://image.flaticon.com/icons/png/128/1170/1170627.png" />
                <span style={styles.cartCount}>{cartTotal}</span>
            </div>
        </div>
    );
}
export default Navbar;

const styles = {
    cartIcon: {
        height: 32,
        marginRight: 30
    },
    nav: {
        height: 70,
        background: "#4267b2",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 0
    },
    cartIconContainer: {
        position: "relative"
    },
    cartCount: {
        background: "yellow",
        borderRadius: "50%",
        marginRight: 10,
        padding: "4px 8px",
        position: "absolute",
        right: 0,
        top: -9
    }
};