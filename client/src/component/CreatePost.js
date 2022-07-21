import { AppBar, Box, Button, Divider, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Image from '@mui/icons-material/Image';

function CreatePost(props) {
  console.log(props);
  const navigate = useNavigate();

  const { isExpired } = props

  if(isExpired){
    alert('refresh token 만료');
    navigate('/');
  }

  const goList = () => {
    navigate('/list');
  }

  const handleCreate = () => {

  }

  return (
    <Box>
      <AppBar position="fixed" sx={{top: 0}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <IconButton color="inherit" onClick={goList}>
            <CloseIcon />
          </IconButton>
          <Typography>
            중고거래 글쓰기
          </Typography>
          <Button color='inherit' onClick={handleCreate}>
            완료
          </Button>
        </Toolbar>
      </AppBar> 

      <Box sx={{paddingTop: '56px'}}>
        <Box sx={{display: 'flex'}}>
          <Box sx={{paddingTop: '20px', paddingBottom: '20px', display: 'inline-flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center'}}>
            <IconButton sx={{border: '1px solid'}} color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
            <Typography>0/10</Typography>
          </Box>

          <Box>
            <img style={{width: '100px'}} src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e' />
          </Box>
        </Box>
        <Divider />

        <Box sx={{paddingTop: '20px', paddingBottom: '20px'}}>
          <TextField id="subject" label="글 제목" variant="outlined" fullWidth />
        </Box>
        
        <Divider />

        <Box sx={{paddingTop: '20px', paddingBottom: '20px'}}>
          <TextField id="subject" label="Outlined" variant="outlined" />
        </Box>

        <Divider />

        <Box sx={{paddingTop: '20px', paddingBottom: '20px'}}>
          <TextField id="subject" label="$ 가격 (선택사항)" variant="outlined" fullWidth />
        </Box>
      </Box>
      
    </Box>
  )
}

export default CreatePost