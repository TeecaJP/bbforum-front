import React from "react";
import { Link } from "react-router-dom";
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Typography, 
  Avatar 
} from "@mui/material";
import { Dashboard as DashboardIcon, Forum as ForumIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import StarRateIcon from '@mui/icons-material/StarRate';

const Logo = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  fontWeight: 'bold'
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const teams = [
  { league: 'セ・リーグ', teams: [
    { name: "阪神", path: "/board/tigers" },
    { name: "広島", path: "/board/carp" },
    { name: "DeNA", path: "/board/baystars" },
    { name: "巨人", path: "/board/giants" },
    { name: "ヤクルト", path: "/board/swallows" },
    { name: "中日", path: "/board/dragons" },
  ]},
  { league: 'パ・リーグ', teams: [
    { name: "オリックス", path: "/board/buffaloes" },
    { name: "ロッテ", path: "/board/marines" },
    { name: "ソフトバンク", path: "/board/hawks" },
    { name: "楽天", path: "/board/eagles" },
    { name: "西武", path: "/board/lions" },
    { name: "日本ハム", path: "/board/fighters" },
  ]},
];

const favoriteTeam = { name: "阪神タイガース", path: "/board/tigers" }

function Sidebar({ currentPath }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Logo variant="h6">BBforum</Logo>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ mr: 2 }}>U</Avatar>
        <Typography>Username</Typography>
      </Box>
      <Divider />
      <List>
      { currentPath === "/" ? (
        <StyledListItem 
          button
          component={Link} 
          to={favoriteTeam.path}
        >
          <ListItemIcon>
            <StarRateIcon />
          </ListItemIcon>
          <ListItemText primary={ favoriteTeam.name } />
        </StyledListItem>
      ) : (
        <StyledListItem
          button
          component={Link} 
          to="/"
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="ダッシュボード" />
        </StyledListItem>
      )}
      </List>
      <Divider />
      {teams.map((league) => (
        <React.Fragment key={league.league}>
          <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 'bold' }}>
            {league.league}
          </Typography>
          <List>
            {league.teams.map((team) => (
              <StyledListItem
                key={team.path}
                button
                component={Link}
                to={team.path}
              >
                <ListItemText primary={`${team.name}`} />
              </StyledListItem>
            ))}
          </List>
          <Divider />
        </React.Fragment>
      ))}
    </Drawer>
  );
}

export default Sidebar;