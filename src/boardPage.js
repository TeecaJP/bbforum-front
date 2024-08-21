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
} from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import PlayerList from "./playerList";

// ダミーデータ
const initialPosts = [
  { id: 1, name: "田中太郎", username: "taro_yamada", content: "こんにちは！素晴らしい天気ですね。", createdAt: new Date(2024, 7, 22, 2, 0) },
  { id: 2, name: "鈴木花子", username: "hanako_suzuki", content: "新しいレストランがオープンしたそうです。行ってみたい！", createdAt: new Date(2024, 7, 22, 0, 15) },
  { id: 3, name: "佐藤一郎", username: "ichiro_sato", content: "週末は映画を見に行く予定です。おすすめの作品があれば教えてください。", createdAt: new Date(2024, 7, 1, 14, 45) },
  { id: 4, name: "山田優子", username: "yuko_yamada", content: "今日の夕食は何にしようかな…", createdAt: new Date(2024, 6, 1, 17, 20) },
  { id: 5, name: "中村健太", username: "kenta_nakamura", content: "明日から新しいプロジェクトが始まります。頑張ります！", createdAt: new Date(2023, 6, 1, 20, 0) },
];

function BoardPage() {
  const { team } = useParams();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  const isUserSignIn = useSelector(selectIsUserSignIn);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (name.trim() && content.trim()) {
      const newPost = { 
        id: posts.length + 1, 
        name: name.trim(), 
        username: username.trim(),
        content: content.trim(), 
        createdAt: new Date() 
      };
      setPosts(prevPosts => [newPost, ...prevPosts]);
      setName("");
      setContent("");
    }
  }, [name, content, posts]);

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
      <Card flexGrow={1} elevation="2" sx={{ flex: 1 }}>
        <CardContent>
        {isUserSignIn ? (
          <Box component="form" onSubmit={handleSubmit} mb={4}>
            <TextField
              fullWidth
              label="お名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="投稿内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              multiline
              rows={4}
            />
            <Button type="submit" variant="contained" color="primary">
              投稿
            </Button>
          </Box>
        ) : (
          <Typography>ログインすると投稿できます。</Typography>
        )}

        <List>
          {filteredPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <Card elevation="3" sx={{ marginBottom: 2 }}>
                <CardContent>
                  <ListItem alignItems="flex-start" disableGutters>
                    <ListItemAvatar>
                      <Avatar>{post.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1 }}>
                            {post.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            @{post.username}
                          </Typography>
                          {/*
                          <Typography variant="caption" color="text.secondary" sx={{ marginLeft: 2 }}>
                            {format(new Date(post.createdAt), 'yyyy/MM/dd HH:mm')}
                          </Typography>
                          */}
                          <Typography variant="caption" color="text.secondary" sx={{ marginLeft: 2 }}>
                           {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ja })}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.primary" sx={{ marginTop: 1 }}>
                          {post.content}
                        </Typography>
                      }
                    />
                  </ListItem>
                </CardContent>
              </Card>
            </React.Fragment>
          ))}
        </List>
        </CardContent>
      </Card>
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