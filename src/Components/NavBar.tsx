import {
  AppBar,
  useMediaQuery,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useUserContext } from "../Context/UserContext";
import LogoutButton from "./LogoutButton";

const route = ["home", "about", "contact"];
const Offset = styled("div")(({ theme }) => ({
  minHeight: 15,
  marginBottom: theme.spacing(2),
}));

export default function NavBar() {
  // const { user,fetchUserDetails } = useUserContext();
  const [login, setLogin] = useState(false);
  const [selected, setSelected] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useUserContext();

  const handleLogin = () => {
    window.location.href = "https://todo-backend-theta-one.vercel.app/api/auth/github";
  };

  const drawerContent = (
    <List>
      {route.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => {
            setDrawerOpen(false);
            setSelected(index);
          }}
        >
          <ListItemText primary={item} />
        </ListItem>
      ))}
      <ListItem
        onClick={() => {
          setDrawerOpen(false);
          setLogin(!login);
        }}
      >
        <Button>
          {user ? (
            <LogoutButton />
          ) : (
            <Button onClick={handleLogin} color="inherit">
              Login with GitHub
            </Button>
          )}
        </Button>
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="sticky" color="error">
        <Toolbar>
          <Tabs sx={isMobile ? { width: "100%" } : {}} centered={isMobile}>
            <Tab label="myTodo" sx={{ color: "black" }} />
          </Tabs>
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setDrawerOpen(true);
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => {
                  setDrawerOpen(false);
                }}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <>
              <Tabs
                sx={{ width: "100%" }}
                centered
                value={selected}
                onChange={(_, value) => setSelected(value)}
              >
                {route.map((item, index) => {
                  return (
                    <Tab
                      disableRipple
                      sx={{ color: "white" }}
                      label={item}
                      key={index}
                      onClick={() => setSelected(index)}
                    />
                  );
                })}
              </Tabs>
            </>
          )}
          {!isMobile &&
            (user ? (
              <>
                <LogoutButton />
              </>
            ) : (
              <>
                <Button onClick={handleLogin} color="inherit">
                  Login with GitHub
                </Button>
              </>
            ))}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
}
