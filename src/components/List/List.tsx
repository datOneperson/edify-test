import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { OrganizationProps } from "../../App";
import { useHistory } from "react-router-dom";

interface ListProps {
  data: OrganizationProps[];
  view: "list" | "detail";
}

// Load the list of organizations
export default ({ data, view }: ListProps) => {
  const history = useHistory();

  return (
    <List>
      {data.map((organization, key) => (
        <ListItem
          button
          onClick={() => {
            history.push("/" + organization.login);
          }}
          key={key}
        >
          <ListItemAvatar>
            <Avatar alt={organization.login} src={organization.avatar_url} />
          </ListItemAvatar>

          <ListItemText
            primary={organization.login}
            secondary={
              view === "detail" ? (
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
              ) : null
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
