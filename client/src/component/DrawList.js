import { AppBar, Avatar, Backdrop, Box, Card, CardContent, CardMedia, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, requirePropFactory, SpeedDial, SpeedDialAction, SpeedDialIcon, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as moment from 'moment'
import 'moment/locale/ko';

function DrawList() {

  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get('/post/list')
    .then(res => {
      console.log(res.data);

      setPost(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  
    return () => {
      
    }
  }, [])

  const handleClick = (id) => {
    console.log(id);
    navigate(`/detail/${id}`);
  }

  return (
    <Box 
      sx={{
        width: '100%', 
      }}
    >
      <AppBar position="fixed" sx={{top: 0}}>
          <Toolbar sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <IconButton
              color="inherit"
          >
              <SearchIcon />
          </IconButton>
          </Toolbar>
      </AppBar> 
      
      <Box sx={{paddingTop: '56px'}}>
        {/* <Card sx={{display: 'flex', padding: 2}}>
          <CardMedia
            component="img"
            sx={{width: 150}}
            image=""
          >

          </CardMedia>
          
          <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <CardContent>
              <Typography component="div" variant='subtitle1'>
                제목
              </Typography>
              <Typography component="div" variant='subtitle1' color="text.secondary">
                주소 + 게시물 시간
              </Typography>
              <Typography component="div" variant='subtitle2' sx={{fontWeight: 'bold'}}>
                가격
              </Typography>
              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <ChatBubbleOutlineIcon color='primary' />
                <Typography>1</Typography>
                <FavoriteBorderIcon color='error' />
                <Typography>2</Typography>
              </Box>
            </CardContent>
          </Box>
        </Card> */}

        {post.map((data, index) => {
          return(
            <Card onClick={() => handleClick(data.id)} key={index} sx={{display: 'flex', padding: 2, cursor: 'pointer'}}>
              <CardMedia
                component="img"
                sx={{width: 150, height: 150}}
                image={data.files.length === 0 ? '' : `http://localhost:4000/${data.files[0].filename}`}
                // src={'localhost:4000/0eecea9cf91bcb5db87e10f056260af8.jpg'}
              >

              </CardMedia>
              
              <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <CardContent>
                  <Typography component="div" variant='subtitle1'>
                    {data.subject}
                  </Typography>
                  <Typography component="div" variant='subtitle1' color="text.secondary">
                    {moment(data.updated_at).fromNow()}
                  </Typography>
                  <Typography component="div" variant='subtitle2' sx={{fontWeight: 'bold'}}>
                    {data.number}
                  </Typography>
                  <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <ChatBubbleOutlineIcon color='primary' />
                    <Typography>1</Typography>
                    <FavoriteBorderIcon color='error' />
                    <Typography>{data.favorites.length}</Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          )
        })}
      </Box>
      

      <ControlledOpenSpeedDial/>
    </Box>
  )
}

function ControlledOpenSpeedDial() {

  const navigate = useNavigate();

  const handleDial = () => {
    navigate('/create');
  }

  const actions = [
    { icon: <AddIcon onClick={handleDial} color='primary' />, name: '내 물건 팔기', action: handleDial},
    // { icon: <SaveIcon />, name: 'Save' },
    // { icon: <PrintIcon />, name: 'Print' },
    // { icon: <ShareIcon />, name: 'Share' },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if(open){
      setOpen(false)
    }else{
      setOpen(true)
    }
  };
  const handleClose = () => setOpen(false);

  

  return (
    // <Box sx={{ height: 600, transform: 'translateZ(0px)', flexGrow: 1 }}>
    <Box>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
   </Box>
  );
}

export default DrawList