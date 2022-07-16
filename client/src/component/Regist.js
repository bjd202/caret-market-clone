import { Avatar, Box, Button, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme();

function Regist() {

  const navigate = useNavigate();

  const [usernameCheck, setUsernameCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsername = (e) => {
    const username = e.target.value;
    setUsername(username);

    if(username === ''){
      setUsernameCheck(true)
    }else{
      setUsernameCheck(false)
    }
  }

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);

    if(password === ''){
      setPasswordCheck(true)
    }else{
      setPasswordCheck(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if(username === '') return;
    if(password === '') return;

    console.log({
      username: username,
      password: password,
    });

    fetch('http://localhost:4000/user/create', data)
    .then((res) => {
      console.log(res.json());
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const goLogin = () => {
    navigate('/login');
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={usernameCheck}
              onChange={handleUsername}
              helperText={username === '' ? 'username을 입력해주세요.' : ''}
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete=""
              autoFocus
            />
            <TextField
              error={passwordCheck}
              onChange={handlePassword}
              helperText={password === '' ? 'password을 입력해주세요.' : ''}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around'
              }}
            >
              <Button
                type="submit"
                
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '40%' }}
              >
                회원가입
              </Button>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '40%' }}
                onClick={goLogin}
              >
                취소
              </Button>
            </Box>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Regist