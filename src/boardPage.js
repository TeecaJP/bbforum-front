import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsUserSignIn } from "./features/authSlice";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Card,
  CardContent,
  Chip,
  Autocomplete,
  Paper,
  styled,
  Fab,
  Tooltip,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import PlayerList from "./playerList";
import { sampleData } from "./src/sampleData";

// Sample Tags
const availableTags = ['投手-1', '投手-2', '投手-3', '野手-1', '野手-2', '野手-3', '野手-4', '野手-5'];

const CustomPaper = styled(Paper)({
  maxHeight: '10rem', 
  overflow: 'auto', 
});

function BoardPage() {
  const { team } = useParams();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(sampleData);
  const [tags, setTags] = useState([]);

  const isUserSignIn = useSelector(selectIsUserSignIn);
  //const isUserSignIn = true;

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (userId.trim() && content.trim()) {
      const newPost = { 
        id: posts.length + 1, 
        userId: userId.trim(), 
        username: username.trim(),
        content: content.trim(), 
        createdAt: new Date() 
      };
      setPosts(prevPosts => [newPost, ...prevPosts]);
      setUsername("");
      setContent("");
    }
  }, [userId, content, posts]);

  const handleTagChange = (event, newValue) => {
    setTags(newValue);
  };

  const filteredPosts = useMemo(() => 
    posts,
    [posts]
  );

  return (
    <Box width="100%">
      <Box mt={3} mb={3} display="flex" justifyContent="center">
        <Typography  
          variant="h4" 
          gutterBottom
          sx={{
            fontWeight: 'medium',
            color: 'text.primary',
            borderColor: 'divider',
            display: 'inline-block'
          }}>
          {team}
        </Typography>
      </Box>
      <Box display="flex" p={2} gap={2}> 
      <Box flexGrow={1} sx={{ flex: 1 }}>
        {isUserSignIn ? (
          <Box component="form" onSubmit={handleSubmit} mb={4}>
            {/*
            <TextField
              fullWidth
              label="お名前"
              value={userId}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ marginBottom: 1 }}
            />
            */}
            <TextField
              fullWidth
              label="投稿内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ marginBottom: 1 }}
              multiline
              rows={4}
            />
            <Autocomplete
              multiple
              options={availableTags}
              value={tags}
              onChange={handleTagChange}
              sx={{ marginBottom: 1 }}
              PaperComponent={(props) => <CustomPaper {...props} />}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="タグ" placeholder="タグを選択" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={option}
                    label={option}
                    {...getTagProps({ index })}
                    variant="outlined"
                  />
                ))
              }
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 1 }}>
              投稿
            </Button>
          </Box>
        ) :  (
          <Box flexGrow={1} sx={{ flex: 1 }}> 
            <Tooltip title="ログインすると投稿ができます。" followCursor>
              <Card sx={{ paddingLeft: 1, paddingRight: 1}}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>あなたの意見を投稿してみましょう！</Typography>
                  <Fab size="small" color="primary" aria-label="edit">
                    <EditIcon />
                  </Fab>
                </CardContent>
              </Card>
            </Tooltip>
          </Box>
        )}
          <Box sx={{ height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ 
              height: 'calc(100vh - 64px)', 
              overflowY: 'scroll', 
              scrollbarWidth: 'none', /* Firefox */
              '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
              '&::-webkit-scrollbar': { display: 'none' } /* Chrome, Safari, Opera */
            }}> 
              <List>
                {filteredPosts.map((post) => (
                  <React.Fragment key={post.id}>
                    <Card elevation="3" sx={{ marginBottom: 2 }}>
                      <CardContent>
                        <ListItem alignItems="flex-start" disableGutters>
                          <ListItemAvatar>
                            <Avatar>{post.user_id[0]}</Avatar>
                          </ListItemAvatar>
                          <Box sx={{ flex: 1 }}>
                            <ListItemText
                              primary={
                                <Box display="flex" alignItems="center">
                                  <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1 }}>
                                    {post.user_name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    @{post.user_id}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ marginLeft: 2 }}>
                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ja })}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <>
                                  <Typography variant="body2" color="text.primary" sx={{ marginTop: 1 }}>
                                    {post.content}
                                  </Typography>
                                  <Box sx={{ marginTop: 1 }}>
                                    {post.tags.map((tag) => (
                                      <Chip key={tag} size="small" label={tag} sx={{ marginRight: 1 }} />
                                    ))}
                                  </Box>
                                </>
                              }
                            />
                          </Box>
                        </ListItem>
                      </CardContent>
                    </Card>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Box>
      </Box>
      <Card flex={1} elevation="2" sx={{ flexGrow: 0 }}>
        <CardContent sx={{ p: 4 }}>
          <PlayerList />
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
}

export default BoardPage;