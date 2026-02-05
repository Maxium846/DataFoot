import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Box } from "@mui/system";

import { getAllLeague } from "../../api/leaguesApi";

export default function Entete() {
  const [leagues, setLeagues] = useState([]);

  // Menu mobile
  const [anchorElNav, setAnchorElNav] = useState(null);

  // Menu championnat (desktop)
  const [anchorElLeague, setAnchorElLeague] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);

  useEffect(() => {
    getAllLeague()
      .then((data) => setLeagues(data))
      .catch((err) =>
        console.error("Erreur chargement ligues :", err)
      );
  }, []);

  /* ---------- Handlers ---------- */

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLeagueMenu = (event, league) => {
    setAnchorElLeague(event.currentTarget);
    setSelectedLeague(league);
  };

  const handleCloseLeagueMenu = () => {
    setAnchorElLeague(null);
    setSelectedLeague(null);
  };

  /* ---------- Render ---------- */

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#37003c" }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>

          {/* Logo desktop */}
          <SportsSoccerIcon sx={{ mr: 1, display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
            }}
          >
            FootStats
          </Typography>

          {/* -------- MENU MOBILE -------- */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {leagues.map((league) => [
                <MenuItem
                  key={`${league.id}-title`}
                  disabled
                  sx={{ fontWeight: "bold" }}
                >
                  {league.name}
                </MenuItem>,

                <MenuItem
                  key={`${league.id}-classement`}
                  component={Link}
                  to={`/championnat/${league.id}/classement`}
                  onClick={handleCloseNavMenu}
                  sx={{ pl: 4 }}
                >
                  Classement
                </MenuItem>,

                <MenuItem
                  key={`${league.id}-stats`}
                  component={Link}
                  to={`/championnat/${league.id}/stats`}
                  onClick={handleCloseNavMenu}
                  sx={{ pl: 4 }}
                >
                  Stats
                </MenuItem>,

                <MenuItem
                  key={`${league.id}-clubs`}
                  component={Link}
                  to={`/championnat/${league.id}/clubs`}
                  onClick={handleCloseNavMenu}
                  sx={{ pl: 4 }}
                >
                  Clubs
                </MenuItem>,
              ])}
            </Menu>
          </Box>

          {/* Logo mobile */}
          <SportsSoccerIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
            }}
          >
            FootStats
          </Typography>

          {/* -------- MENU DESKTOP -------- */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {leagues.map((league) => (
              <Button
                key={league.id}
                onClick={(e) => handleOpenLeagueMenu(e, league)}
                sx={{
                  my: 2,
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#5e1b76" },
                }}
              >
                {league.name}
              </Button>
            ))}

            <Menu
              anchorEl={anchorElLeague}
              open={Boolean(anchorElLeague)}
              onClose={handleCloseLeagueMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {selectedLeague && [
                <MenuItem
                  key="classement"
                  component={Link}
                  to={`/championnat/${selectedLeague.id}/classement`}
                  onClick={handleCloseLeagueMenu}
                >
                  Classement
                </MenuItem>,

                <MenuItem
                  key="stats"
                  component={Link}
                  to={`/championnat/${selectedLeague.id}/stats`}
                  onClick={handleCloseLeagueMenu}
                >
                  Stats
                </MenuItem>,

                <MenuItem
                  key="clubs"
                  component={Link}
                  to={`/championnat/${selectedLeague.id}/clubs`}
                  onClick={handleCloseLeagueMenu}
                >
                  Clubs
                </MenuItem>,
              ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
