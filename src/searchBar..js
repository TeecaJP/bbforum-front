import React from "react";
import { 
  Box, 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Divider 
} from '@mui/material';


function SearchBar() {
  // ハードコードされた検索履歴と急上昇ワード
  const searchHistory = ['Yankees', 'Shohei Ohtani', 'Baseball Rules', 'World Series'];
  const trendingWords = ['MVP', 'Home Run', 'Perfect Game'];

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100%',
        padding: 2, 
        bgcolor: 'background.paper' 
      }}>
      {/* Search Bar */}
      <TextField 
        variant="outlined" 
        fullWidth 
        placeholder="検索..."
        sx={{ marginBottom: 2 }}
      />

      {/* Search History */}
      <Typography variant="h7" sx={{ marginBottom: 1 }}>
        検索履歴
      </Typography>
      <List>
        {searchHistory.map((item, index) => (
          <ListItem button key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ marginY: 2 }} />
      
      {/* Trend */}
      <Typography variant="h7" sx={{ marginBottom: 1 }}>
        トレンド
      </Typography>
      <List>
        {trendingWords.map((item, index) => (
          <ListItem button key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SearchBar;