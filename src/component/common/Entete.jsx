import * as React from "react";
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
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const pages = [
  { name: "Accueil", path: "/" },
  { name: "Championnat", path: "/classementPage" },
  { name: "Stats", path: "/stats" },
  { name: "Calendrier", path: "/calendrierPL" },
  { name: "Équipes", path: "/equipe" },
];

const championnatSubPages = [
  { name: "Premier League", path: "/premier-league" },
  { name: "Ligue 1", path: "/ligue-1" },
  { name: "La Liga", path: "/la-liga" },
  { name: "Serie A", path: "/Serie A" },
  { name: "BundeLigue A", path: "/BundesLigueA" },
];

export default function Entete() {
  // Menu mobile
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  // Menu Championnat
  const [anchorElChampionnat, setAnchorElChampionnat] = React.useState(null);
  const handleOpenChampionnatMenu = (event) =>
    setAnchorElChampionnat(event.currentTarget);
  const handleCloseChampionnatMenu = () => setAnchorElChampionnat(null);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#37003c" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo Desktop */}
          <SportsSoccerIcon
            sx={{ mr: 1, display: { xs: "none", md: "flex" } }}
          />
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
              {pages.map((page) => {
                if (page.name !== "Championnat") {
                  return (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography
                        component={Link}
                        to={page.path}
                        sx={{ textDecoration: "none", color: "inherit" }}
                        textAlign="center"
                      >
                        {page.name}
                      </Typography>
                    </MenuItem>
                  );
                } else {
                  return championnatSubPages.map((subPage) => (
                    <MenuItem
                      key={subPage.name}
                      component={Link}
                      to={subPage.path}
                      onClick={handleCloseNavMenu}
                    >
                      {subPage.name}
                    </MenuItem>
                  ));
                }
              })}
            </Menu>
          </Box>

          {/* Logo Mobile */}
          <SportsSoccerIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
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
            {pages.map((page) => {
              if (page.name !== "Championnat") {
                return (
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
                );
              } else {
                return (
                  <Button
                    key={page.name}
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
                    {page.name}
                  </Button>
                );
              }
            })}

            {/* Menu déroulant Championnat */}
            <Menu
              anchorEl={anchorElChampionnat}
              open={Boolean(anchorElChampionnat)}
              onClose={handleCloseChampionnatMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {championnatSubPages.map((subPage) => (
                <MenuItem
                  key={subPage.name}
                  component={Link}
                  to={subPage.path}
                  onClick={handleCloseChampionnatMenu}
                >
                  {subPage.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
