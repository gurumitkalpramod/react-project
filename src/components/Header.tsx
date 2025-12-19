import React from "react";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/hooks";
import { addToCart, removeFromCart, removeItem } from "../redux/slices/cartSlice";
import { logout } from "../redux/slices/authSlice";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";


import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const Header: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  /* handleRemove deprecated: use handleDecrement to decrement quantity */

  const handleIncrement = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const handleDelete = (item: any) => {
    // remove item entirely regardless of quantity
    dispatch(removeItem(item));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const totalQuantity = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
  const grandTotal = items.reduce((sum, it) => sum + (it.quantity || 0) * it.price, 0);

  const toggleMobile = (open: boolean) => () => {
    setMobileOpen(open);
  };
  const toggleCart = (open: boolean) => () => {
    setCartOpen(open);
  };

  return (
    <>
      <AppBar position="sticky" elevation={3} sx={{ background: 'linear-gradient(90deg,#1976d2 0%,#47a7ff 100%)', py: 1 }}>
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleMobile(true)}
              sx={{ mr: 1, display: { xs: "inline-flex", sm: "none" } }}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>

            <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 1 }}>
              <StorefrontIcon />
            </Avatar>

            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              My Store
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              <Button component={RouterLink} to="/" color="inherit" sx={{ borderRadius: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' } }}>Products</Button>
              <Button component={RouterLink} to="/about" color="inherit" sx={{ borderRadius: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' } }}>About</Button>
              <Button component={RouterLink} to="/dashboard" color="inherit" sx={{ borderRadius: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' } }}>Dashboard</Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={toggleCart(true)} aria-label="open cart" sx={{ bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <Button variant="contained" color="error" onClick={handleLogout} sx={{ color: 'common.white' }}>Logout</Button>
            ) : (
              <Button component={RouterLink} to="/login" color="inherit">Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile navigation drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobile(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleMobile(false)}>
          <Box sx={{ display: "flex", alignItems: "center", p: 2, justifyContent: "space-between" }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleMobile(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            <ListItemButton>
              <Typography sx={{ pl: 1 }}>Products</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography sx={{ pl: 1 }}>About</Typography>
            </ListItemButton>
            <ListItemButton>
              <Typography sx={{ pl: 1 }}>Contact</Typography>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Cart drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCart(false)}>
        <Box sx={{ width: { xs: 300, sm: 360 }, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="h6">Your Cart</Typography>
            <IconButton onClick={toggleCart(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 1 }} />

          {items.length === 0 ? (
            <Typography variant="body1">Your cart is empty.</Typography>
          ) : (
            <List>
              {items.map((item) => (
                <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                    <Box component="img" src={item.image} alt={item.title} sx={{ width: 64, height: 64, objectFit: 'contain' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</Typography>
                      <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1, whiteSpace: 'nowrap' }}>
                    <IconButton size="small" color="primary" onClick={() => handleDecrement(item)} aria-label="decrement">
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ minWidth: 28, textAlign: 'center' }}>{item.quantity}</Typography>
                    <IconButton size="small" color="primary" onClick={() => handleIncrement(item)} aria-label="increment">
                      <AddIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(item)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}

          <Divider sx={{ mt: 1 }} />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1">Total items</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{totalQuantity}</Typography>
          </Box>

          <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1">Grand Total</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>${grandTotal.toFixed(2)}</Typography>
          </Box>

          <Button variant="contained" fullWidth sx={{ mt: 2 }} disabled={totalQuantity === 0}>
            Checkout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
