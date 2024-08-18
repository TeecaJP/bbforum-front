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
  Divider 
} from "@mui/material";
import { format } from "date-fns";

// ダミーデータ
const initialPosts = [
  { id: 1, name: "田中太郎", content: "こんにちは！素晴らしい天気ですね。", createdAt: new Date(2023, 7, 1, 10, 30) },
  { id: 2, name: "鈴木花子", content: "新しいレストランがオープンしたそうです。行ってみたい！", createdAt: new Date(2023, 7, 1, 11, 15) },
  { id: 3, name: "佐藤一郎", content: "週末は映画を見に行く予定です。おすすめの作品があれば教えてください。", createdAt: new Date(2023, 7, 1, 14, 45) },
  { id: 4, name: "山田優子", content: "今日の夕食は何にしようかな…", createdAt: new Date(2023, 7, 1, 17, 20) },
  { id: 5, name: "中村健太", content: "明日から新しいプロジェクトが始まります。頑張ります！", createdAt: new Date(2023, 7, 1, 20, 0) },
];

function BoardPage() {
  const { team } = useParams();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  const isUserSignIn = useSelector(selectIsUserSignIn);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (name.trim() && content.trim()) {
      const newPost = { 
        id: posts.length + 1, 
        name: name.trim(), 
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
    <Box>
      <Typography variant="h4" gutterBottom>{team}掲示板</Typography>
      
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
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{post.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={post.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {post.content}
                    </Typography>
                    <br />
                    <Typography component="span" variant="caption" color="text.secondary">
                      {format(new Date(post.createdAt), 'yyyy/MM/dd HH:mm')}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < filteredPosts.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default BoardPage;