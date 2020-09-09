import React, { useState, useEffect } from "react";
import { OrganizationProps } from "../../App";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface DetailProps {
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

export default ({ delay, organization }: DetailProps) => {
  if (!organization) {
    return <p>Loading...</p>;
  }

  const [data, setData] = useState<OrganizationDetailProps>();

  useEffect(() => {
    setData(undefined);

    setTimeout(async () => {
      const response = await fetch(
        "https://api.github.com/orgs/" + organization.login
      );

      const org = await response.json();

      setData(org);
    }, delay * 1000);
  }, [delay, organization]);

  return (
    <>
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
      </ListItem>
      {data ? (
        <Card>
          <CardContent>
            <Typography variant="h2">
              {data.name}
            </Typography>
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
      ) : 'Loading...'}
    </>
  );
};
