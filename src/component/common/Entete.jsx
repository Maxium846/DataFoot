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



const pages = [
  { name: "Accueil", path: "/" },
  { name: "Stats", path: "/stats" },
  { name: "Calendrier", path: "/calendrierPL" },
  { name: "Équipes", path: "/equipe" },
];

export default function Entete() {
  // États pour menus
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElChampionnat, setAnchorElChampionnat] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenChampionnatMenu = (event) =>
    setAnchorElChampionnat(event.currentTarget);
  const handleCloseChampionnatMenu = () => setAnchorElChampionnat(null);

  // ⚡ Chargement dynamique des ligues
  const [leagues, setLeagues] = useState([]);
  useEffect(() => {
    getAllLeague()
      .then((data) => setLeagues(data))
      .catch((err) => console.error("Erreur lors du chargement des ligues", err));
  }, []);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#37003c" }}>
      <Container maxWidth={false}> {/* ← full width */}
        <Toolbar disableGutters sx={{ width: "100%" }}>
          {/* Logo Desktop */}
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

          {/* Menu Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  {page.name}
                </MenuItem>
              ))}
              {/* Menu déroulant ligues */}
              {leagues.map((league) => (
                <MenuItem
                  key={league.id}
                  component={Link}
                  to={`/championnat/${league.id}`}
                  onClick={handleCloseNavMenu}
                >
                  {league.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo Mobile */}
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

          {/* Menu Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#5e1b76" },
                }}
              >
                {page.name}
              </Button>
            ))}

            <Button
              onClick={handleOpenChampionnatMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { backgroundColor: "#5e1b76" },
              }}
            >
              Championnats
            </Button>

            <Menu
              anchorEl={anchorElChampionnat}
              open={Boolean(anchorElChampionnat)}
              onClose={handleCloseChampionnatMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {leagues.map((league) => (
                <MenuItem
                  key={league.id}
                  component={Link}
                  to={`/championnat/${league.id}`}
                  onClick={handleCloseChampionnatMenu}
                >
                  {league.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
