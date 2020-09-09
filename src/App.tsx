import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DelayMenu from "./components/DelayMenu/DelayMenu";
import ViewOptions from "./components/ViewOptions/ViewOptions";
import Container from "@material-ui/core/Container";
import List from "./components/List/List";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
}));

export interface OrganizationProps {
  login: string;
  avatar_url: string;
  description: string;
  url: string;
}

function App() {
  const classes = useStyles();
  const [delay, setDelay] = useState<0 | 1 | 2>(0);
  const [view, setView] = useState<"list" | "detail">("list");
  const [data, setData] = useState<OrganizationProps[]>([]);

  useEffect(() => {
    // Clear data to show "refresh" is happening
    setData([]);

    // Simulate the delay from the requirements
    setTimeout(async () => {
      try {
        const response = await fetch("https://api.github.com/organizations");

        const data = await response.json();
  
        setData(data);
      } catch {
        setData([]);
      }
    }, delay * 1000);
  }, [delay]);

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

      <Container className={classes.container}>
        <ViewOptions view={view} updateView={setView} />

        <List data={data} view={view} />
      </Container>
    </div>
  );
}

export default App;
