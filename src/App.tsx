import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DelayMenu from "./components/DelayMenu/DelayMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [delay, setDelay] = useState<0 | 1 | 2>(0);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Edify test
          </Typography>
          <DelayMenu
            delay={delay}
            updateDelay={(delay: 0 | 1 | 2) => {
              setDelay(delay);
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
