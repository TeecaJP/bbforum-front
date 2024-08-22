import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActionArea, 
  Grid, 
  Container 
} from "@mui/material";

const teams = [
  { league: 'セ・リーグ', teams: [
    { name: "阪神タイガース", path: "/board/tigers", image: "/path_to_image/tigers.jpg" },
    { name: "広島東洋カープ", path: "/board/carp", image: "/path_to_image/carp.jpg" },
    { name: "横浜DeNAベイスターズ", path: "/board/baystars", image: "/path_to_image/baystars.jpg" },
    { name: "読売ジャイアンツ", path: "/board/giants", image: "/path_to_image/giants.jpg" },
    { name: "東京ヤクルトスワローズ", path: "/board/swallows", image: "/path_to_image/swallows.jpg" },
    { name: "中日ドラゴンズ", path: "/board/dragons", image: "/path_to_image/dragons.jpg" },
  ]},
  { league: 'パ・リーグ', teams: [
    { name: "オリックス・バファローズ", path: "/board/buffaloes", image: "/path_to_image/buffaloes.jpg" },
    { name: "千葉ロッテマリーンズ", path: "/board/marines", image: "/path_to_image/marines.jpg" },
    { name: "福岡ソフトバンクホークス", path: "/board/hawks", image: "/path_to_image/hawks.jpg" },
    { name: "東北楽天ゴールデンイーグルス", path: "/board/eagles", image: "/path_to_image/eagles.jpg" },
    { name: "埼玉西武ライオンズ", path: "/board/lions", image: "/path_to_image/lions.jpg" },
    { name: "北海道日本ハムファイターズ", path: "/board/fighters", image: "/path_to_image/fighters.jpg" },
  ]},
];

function TeamCard({ team }) {
  return (
    <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link to={team.path} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardMedia
            component="img"
            height="140"
            image={team.image}
            alt={team.name}
          />
          <CardContent>
            <Typography variant="h6" component="div" align="center">
              {team.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

function TopPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="div" gutterBottom sx={{ my: 4 }}>
        チーム一覧
      </Typography>
      {teams.map((league) => (
        <React.Fragment key={league.league}>
          <Typography variant="h5" component="div" gutterBottom sx={{ mt: 4, mb: 2 }}>
            {league.league}
          </Typography>
          <Grid container spacing={3}>
            {league.teams.map((team) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={team.path}>
                <TeamCard team={team} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}
    </Container>
  );
}

export default TopPage;