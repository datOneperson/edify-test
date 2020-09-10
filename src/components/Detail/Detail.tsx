import React, { useState, useEffect } from "react";
import { OrganizationProps } from "../../App";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import { List } from "@material-ui/core";

interface DetailProps {
  addFavorite: (favorite: OrganizationProps) => void;
  isFavorite: boolean;
  delay: 0 | 1 | 2;
  organization?: OrganizationProps;
}

interface OrganizationDetailProps {
  login: string;
  name: string;
  company: string;
  location: string;
  email: string;
  is_verified: boolean;
  created_at: Date;
  public_repos: number;
  public_gists: number;
}

// This is the detail page which shows additional details from the list
// of organizations
export default ({
  addFavorite,
  isFavorite,
  delay,
  organization,
}: DetailProps) => {
  if (!organization) {
    return <p>Loading...</p>;
  }

  const [data, setData] = useState<OrganizationDetailProps>();

  useEffect(() => {
    setData(undefined);

    // Use the delay from the app state and fetch more org info
    setTimeout(async () => {
      const response = await fetch(
        "https://api.github.com/orgs/" + organization.login
      );

      setData(await response.json());
    }, delay * 1000);
  }, [delay, organization]);

  return (
    <>
      {/* This list item section is supposed to mimic the view from the list. Its a little different component wise. */}
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={organization.login} src={organization.avatar_url} />
          </ListItemAvatar>

          <ListItemText
            primary={organization.login}
            secondary={
              <>
                <a
                  href={organization.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {organization.url}
                </a>
                <br />
                <span>{organization.description}</span>
              </>
            }
          />

          {isFavorite ? (
            <StarIcon htmlColor="gold" />
          ) : (
            <ListItemSecondaryAction onClick={() => addFavorite(organization)}>
              <IconButton edge="end">
                <StarIcon htmlColor="inherit" />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </List>
      {/* This is the additional detail section */}
      {data ? (
        <Card>
          <CardContent>
            <Typography variant="h2">{data.name}</Typography>
            <Typography color="textSecondary" gutterBottom>
              {data.location}
            </Typography>
            <ul>
              <li>Public repos: {data.public_repos}</li>
              <li>Public gists: {data.public_gists}</li>
              <li>Created: {data.created_at}</li>
            </ul>
          </CardContent>
        </Card>
      ) : (
        "Loading..."
      )}
    </>
  );
};
