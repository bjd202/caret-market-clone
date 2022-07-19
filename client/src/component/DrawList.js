import { AppBar, Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Toolbar } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

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
      
      <List sx={{ 
        width: '100%',
        bgcolor: 'background.paper' ,
        paddingTop: '56px',
      }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </Box>
  )
}

export default DrawList