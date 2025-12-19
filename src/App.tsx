import { Grid, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import type { RootState } from './redux/store'
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { addToCart } from "./redux/slices/cartSlice";
import { baseURL } from "./service/baseURL";
import type { IProduct } from "./types/product.type";
function App() {
  const [data, setData] = useState<IProduct[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  useEffect(() => {
    fetch(`${baseURL}/products`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleAddtoCart = (item: IProduct) => {
    if (!isAuthenticated) {
      // Redirect to login and preserve current location
      navigate('/login', { state: { from: '/' } })
      return
    }
    dispatch(addToCart(item));
  }

  return (
    <div >
      <Header />

        <Routes>
          <Route path="/" element={
            <Grid container spacing={2} margin={'auto'}>
              {data?.map((item) => (
                <Grid component="div" key={item.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <CardMedia
                      component="img"
                      image={item?.image}
                      alt={item?.title}
                      sx={{ height: { xs: 160, sm: 200 }, objectFit: 'contain', backgroundColor: '#fff', p: 2 }}
                    />

                    <CardContent sx={{ pb: 0 }}>
                      <Typography gutterBottom variant="subtitle1" component="div" noWrap sx={{ fontWeight: 700 }}>
                        {item?.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                        {item?.description.slice(0, 100)}...
                      </Typography>
                    </CardContent>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>${item.price.toFixed(2)}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Rating value={item.rating?.rate || 0} precision={0.1} readOnly size="small" />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>({item.rating?.count})</Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                        <Button size="small" variant="contained" onClick={() => handleAddtoCart(item)} sx={{ width: { xs: '100%', sm: 'auto' } }} aria-label="Add to cart">Add to Cart</Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          } />

          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
  );
}

export default App;
