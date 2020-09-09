import React, { useState, useEffect, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DelayMenu from "./components/DelayMenu/DelayMenu";
import ViewOptions from "./components/ViewOptions/ViewOptions";
import Container from "@material-ui/core/Container";
import List from "./components/List/List";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, useRouteMatch, NavLink } from "react-router-dom";
import Detail from "./components/Detail/Detail";

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
  link: {
    color: "inherit",
    textDecoration: "none",
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
  const match = useRouteMatch<{ login: "" }>("/:login");
  const [delay, setDelay] = useState<0 | 1 | 2>(0);
  const [view, setView] = useState<"list" | "detail">("list");
  const [data, setData] = useState<OrganizationProps[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    // Clear data to show "refresh" is happening
    setData([]);

    // Simulate the delay from the requirements
    setTimeout(async () => {
      try {
        const response = await fetch("https://api.github.com/organizations");

        const orgs = await response.json();

        setData(orgs);
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
            <NavLink to="/" className={classes.link}>
              Edify test
            </NavLink>
          </Typography>
          <DelayMenu delay={delay} updateDelay={setDelay} />
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        <Switch>
          <Route exact path="/">
            <Grid container direction="row" justify="space-between">
              <TextField
                label="Filter"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setFilter(event.target.value);
                }}
                size="small"
                variant="outlined"
                value={filter}
              />
              <ViewOptions view={view} updateView={setView} />
            </Grid>

            <List
              data={data.filter((organization) =>
                organization.login.includes(filter)
              )}
              view={view}
            />
          </Route>
          <Route path="/:login">
            <Detail
              delay={delay}
              organization={data.find(
                (organization) => organization.login === match?.params.login
              )}
            />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
