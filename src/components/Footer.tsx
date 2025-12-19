import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PaymentIcon from "@mui/icons-material/Payments";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailTrim = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrim || !emailRegex.test(emailTrim)) {
      setEmailError('Please enter a valid email');
      setErrorOpen(true);
      inputRef.current?.focus();
      return;
    }
    // For demo: show a success message (no backend)
    setEmailError(null);
    setOpen(true);
    setEmail("");
    inputRef.current?.blur();
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'common.white', mt: 8, px: { xs: 2, md: 4 }, py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'flex-start', justifyContent: 'space-between' }}>

          {/* About / Branding */}
          <Box sx={{ maxWidth: 380, mb: { xs: 3, md: 0 }, pr: { md: 2 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>My Store</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mb: 2 }}>
              Quality products, curated for you. Fast shipping & easy returns.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <PaymentIcon sx={{ mr: 0.5 }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Secure payments</Typography>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Quick links</Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">Home</Link>
              <Link href="#" color="inherit" underline="hover">Products</Link>
              <Link href="#" color="inherit" underline="hover">About</Link>
              <Link href="#" color="inherit" underline="hover">Contact</Link>
            </Stack>
          </Box>

          {/* Newsletter */}
          <Box sx={{ minWidth: { md: 340 }, width: '100%', mb: { xs: 2, md: 0 }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'center' } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, textAlign: { xs: 'left', md: 'center' } }}>Join our newsletter</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mb: 2, textAlign: { xs: 'left', md: 'center' } }}>
              Get updates on new products and exclusive offers.
            </Typography>

            <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'center' }, width: '100%' }}>
              <TextField
                inputRef={inputRef}
                size="small"
                type="email"
                placeholder="Your email"
                autoComplete="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(null); }}
                onBlur={() => {
                  const emailTrim = email.trim();
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (emailTrim && !emailRegex.test(emailTrim)) setEmailError('Please enter a valid email');
                }}
                error={!!emailError}
                helperText={emailError || ''}
                FormHelperTextProps={{ sx: { color: 'rgba(255,255,255,0.85)' } }}
                sx={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 1,
                  input: { color: 'common.white', py: 1 },
                  width: { xs: '100%', sm: 220 },
                  mx: { xs: 0, sm: 'auto' }
                }}
              />
            </Box>

            <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255,255,255,0.65)', mt: 1, textAlign: { xs: 'left', md: 'center' } }}>Press Enter to subscribe</Typography>

            <Box sx={{ mt: 2, display: 'flex', gap: 1.5 }}>
              <IconButton aria-label="facebook" href="#" sx={{ color: 'common.white', bgcolor: 'rgba(255,255,255,0.04)', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" href="#" sx={{ color: 'common.white', bgcolor: 'rgba(255,255,255,0.04)', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="instagram" href="#" sx={{ color: 'common.white', bgcolor: 'rgba(255,255,255,0.04)', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box sx={{ borderTop: 1, borderColor: 'rgba(255,255,255,0.06)', mt: 6, pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>© {year} My Store. All rights reserved.</Typography>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.85)' }}>Privacy</Link>
            <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.85)' }}>Terms</Link>
            <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.85)' }}>Contact</Link>
          </Box>
        </Box>
      </Container>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Subscribed! Check your email for confirmation.
        </Alert>
      </Snackbar>

      <Snackbar open={errorOpen} autoHideDuration={3000} onClose={() => setErrorOpen(false)}>
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
          {emailError || 'Please enter a valid email.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;
