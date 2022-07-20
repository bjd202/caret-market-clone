import { AppBar, Avatar, Backdrop, Box, Card, CardContent, CardMedia, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon, Toolbar, Typography } from '@mui/material'
import React from 'react'
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

function DrawList() {
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
        <Card sx={{display: 'flex', padding: 2}}>
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
        </Card>
        
      </Box>
      

      <ControlledOpenSpeedDial/>
    </Box>
  )
}

function ControlledOpenSpeedDial() {
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
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
          />
        ))}
      </SpeedDial>
   </Box>
  );
}

export default DrawList