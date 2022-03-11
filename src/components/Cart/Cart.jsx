import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">You haven't added anything to your cart.  
         <Link to="/" className={classes.link}> Click Here to Start Shopping!</Link>
         </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xz={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCardQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );
    if (!cart.line_items) return 'Loading...'

    return (
        <div>
            <Container>
                <div className={classes.toolbar} />
                <Typography className={classes.title} variant="h4" gutterBottom>Your Shopping Cart</Typography>
                {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
            </Container>
        </div>
    )
}

export default Cart