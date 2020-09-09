import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DelayMenu from "../DelayMenu/DelayMenu";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import { NavLink } from "react-router-dom";
import { Drawer, List, ListItem } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import { OrganizationProps } from "../../App";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

interface AppBarProps {
  children: string;
  favorites: OrganizationProps[];
  delay: 0 | 1 | 2;
  updateDelay: (delay: 0 | 1 | 2) => void;
}

export default ({ children, favorites, delay, updateDelay }: AppBarProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <StarIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className={classes.link}>
              {children}
            </NavLink>
          </Typography>
          <DelayMenu delay={delay} updateDelay={updateDelay} />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer open={open} onClose={() => setOpen(false)} variant="temporary">
          <List
            subheader={<ListSubheader component="div">Favorites</ListSubheader>}
          >
            {favorites.map((favorite, key) => (
              <ListItem key={key}>
                <NavLink to={"/" + favorite.login} className={classes.link}>
                  {favorite.login}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </nav>
    </>
  );
};
