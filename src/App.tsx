import React, { useState, useEffect, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ViewOptions from "./components/ViewOptions/ViewOptions";
import Container from "@material-ui/core/Container";
import List from "./components/List/List";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import AppBar from "./components/AppBar/AppBar";

const useStyles = makeStyles((theme) => ({
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
  const match = useRouteMatch<{ login: "" }>("/:login");
  const favoritesFromLocalStorage = JSON.parse(window.localStorage.getItem('favorites') || '[]') as OrganizationProps[];

  const [delay, setDelay] = useState<0 | 1 | 2>(0);
  const [view, setView] = useState<"list" | "detail">("list");
  const [data, setData] = useState<OrganizationProps[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<OrganizationProps[]>(favoritesFromLocalStorage)

  useEffect(() => {
    // Clear data to show "refresh" is happening
    setData([]);
    setLoading(true);

    // Simulate the delay from the requirements
    setTimeout(async () => {
      try {
        const response = await fetch("https://api.github.com/organizations");

        setData(await response.json());
      } catch {
        setData([]);
      }

      setLoading(false);
    }, delay * 1000);
  }, [delay]);

  return (
    <div className="App">
      <AppBar favorites={favorites} delay={delay} updateDelay={setDelay}>
        Edify test
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

            {loading ? <p>Loading...</p> : (
              <List
                data={data.filter((organization) =>
                  organization.login.includes(filter)
                )}
                view={view}
              />
            )}
          </Route>
          <Route path="/:login">
            <Detail
              delay={delay}
              organization={data.find(
                (organization) => organization.login === match?.params.login
              )}
              addFavorite={favorite => {
                const newFavorites = [
                  ...favorites,
                  favorite
                ];

                setFavorites(newFavorites);
                window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
              }}
              isFavorite={!!favorites.find(favorite => favorite.login === match?.params.login)}
            />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
