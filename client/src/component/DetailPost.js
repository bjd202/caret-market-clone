import { AppBar, Avatar, Box, Button, Divider, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import moment from 'moment';

function DetailPost() {
  const navigate = useNavigate();

  const {id} = useParams();
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    getData();
    
    return () => {
      
    }
  }, [])
  
  const getData = async() => {
    try {
      const res = await axios.get(`http://localhost:4000/post/${id}`, {id: id});
      console.log(res.data);
      setData(res.data);
      setImages(res.data.files);
      console.log(data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  const handleGoHome = () => {
    navigate('/list');
  }

  const handleFavorite = () => {
    if(favorite){
      axios.delete('http://localhost:4000/favorite/delete', {
        data: {
          id: id
        }
      })
      .then(res => {
        console.log(res.data);
        alert('관심을 해제했습니다.');
        setFavorite(false);
      })
      .catch(err => {
        console.log(err);
      })
    }else{
      axios.post('http://localhost:4000/favorite/create', {id: id})
      .then(res => {
        console.log(res.data);
        setFavorite(true);
        alert('관심 등록했습니다.');
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <Box>
      <AppBar position="fixed" sx={{top: 0}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box>
            <IconButton color="inherit" onClick={handleGoBack} >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleGoHome}>
              <HomeIcon />
            </IconButton>
          </Box>

          <IconButton color="inherit" >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar> 

      <Box sx={{paddingTop: '70px'}}>
        <Carousel
          sx={{height: 300}}
          autoPlay={false}
        >
            {
              images.map((image, index) => {
                const src = `http://localhost:4000/${image.filename}`;
                return <img src={src} alt={'abc'} key={index} style={{height: 300, width: '100%'}}/>
              })
            }
        </Carousel>
      </Box>

      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Avatar sx={{marginRight: '10px'}} />

        <Box>
          <Typography>
            {data.user?.username}
          </Typography>
          <Typography>
            
          </Typography>
        </Box>
      </Box>

      <Box sx={{paddingTop: 2}}>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>
          {data.subject}
        </Typography>
        <Typography variant='subtitle2' color={'GrayText'}>
          {data.category} / {moment(data.updated_at).fromNow()}
        </Typography>

        <Typography sx={{paddingTop: 2}}>
          {data.description}
        </Typography>

        <Typography sx={{paddingTop: 2}} variant='subtitle2' color={'GrayText'}>조회 {data.views}</Typography>
      </Box>

      <Box>

      </Box>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <IconButton sx={{margin: 2}} onClick={handleFavorite}>
              {/* <FavoriteBorderIcon /> */}
              {favorite ? <FavoriteIcon sx={{color: 'rgb(255 0 0 / 91%)'}} /> : <FavoriteBorderIcon />}
            </IconButton>
            <Divider orientation='vertical' variant='middle'/>

            <Box>
              <Typography sx={{fontWeight: 'bold'}}>{data.number?.toLocaleString()} 원</Typography>
              <Typography variant='subtitle2'>가격 제안 불가</Typography>
            </Box>
          </Box>

          <Button sx={{backgroundColor: '#f99314'}} variant='contained'>채팅하기</Button>
        </Box>
      </Paper>
    </Box>
  )
}



export default DetailPost