import { AppBar, Box, Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Image from '@mui/icons-material/Image';
import axios from 'axios';

function CreatePost(props) {
  console.log(props);
  const navigate = useNavigate();

  const { isExpired } = props

  if(isExpired){
    alert('refresh token 만료');
    navigate('/');
  }

  const [images, setImages] = useState([])
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [number, setNumber] = useState(0);

  const goList = () => {
    navigate('/list');
  }

  const handleSubject = (e) => {
    const {id, value} = e.target
    setSubject(value);
  }

  const handleCategory = (e) => {
    const {id, value} = e.target
    setCategory(value);
    console.log(value);
  }

  const handleNumber = (e) => {
    const {id, value} = e.target
    setNumber(value);
  }

  const handleImage = (e) => {
    console.log(e.target.files);

    if(images.length >= 10){
      alert('이미지는 10개 이상 업로드 불가능합니다.');
      return;
    }

    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImages((image) => [...image, reader.result]);
      }
      reader.onerror = () => {
        console.log(reader.error);
      }
    }

    console.log(images);
  }

  const removeImage = (e) => {
    const i = Number(e.target.getAttribute('data-key'));
    console.log(i);

    const tmpArr = images.filter((value, index) => {
      console.log(index);
      return i !== index;
    })
    console.log(tmpArr);

    setImages(tmpArr);

    // console.log(images);
  }

  const handleCreate = (e) => {
    const data = {
      subject,
      category,
      number
    }

    console.log(data);

    axios.post('http://localhost/usedTrade/create', data)
    .then(res => {

    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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

      <Box component='form' noValidate sx={{paddingTop: '70px'}}>
        <Box sx={{display: 'flex', flexWrap: 'nowrap'}}>
          <Box sx={{paddingTop: '20px', paddingBottom: '20px', display: 'inline-flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center'}}>
            <IconButton sx={{border: '1px solid'}} color="primary" aria-label="upload picture" component="label">
              <input 
                id='images'
                hidden 
                accept="image/*" 
                type="file" 
                onChange={handleImage}
                multiple
              />
              <PhotoCamera />
            </IconButton>
            <Typography>{images.length}/10</Typography>
          </Box>

          <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
            {/* <img style={{width: '100px'}} src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e' /> */}
            {images.map((value, index) => {
              return (
                <Box key={index} sx={{display: 'flex', alignItems: 'flex-start'}}>
                  <img style={{width: '100px'}} src={value} />
                  <IconButton data-key={index} onClick={removeImage}>
                    <CloseIcon data-key={index} />
                  </IconButton>
                </Box>
              )
            })}
          </Box>
        </Box>
        <Divider />

        <Box sx={{paddingTop: '20px', paddingBottom: '20px'}}>
          <TextField 
            id="subject" 
            label="글 제목" 
            variant="outlined" 
            fullWidth 
            onChange={handleSubject}
          />
        </Box>
        
        <Divider />

        <Box sx={{paddingTop: '20px', paddingBottom: '20px'}}>
          <FormControl fullWidth>
            <InputLabel id="category">카테고리 선택</InputLabel>
            <Select
              labelId="category"
              id="category"
              label="카테고리 선택"
              value={category || ''}
              onChange={handleCategory}
            >
              <MenuItem value={'디지털기기'}>디지털기기</MenuItem>
              <MenuItem value={'생활가전'}>생활가전</MenuItem>
              <MenuItem value={'가구/인테리어'}>가구/인테리어</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider />

        <Box sx={{paddingTop: '20px', paddingBottom: '20px'}}>
          <TextField 
            type='number'
            id="subject" 
            label="$ 가격 (선택사항)" 
            variant="outlined" 
            onChange={handleNumber}
            fullWidth />
        </Box>
      </Box>
      
    </Box>
  )
}

export default CreatePost