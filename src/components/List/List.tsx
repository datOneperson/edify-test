import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { OrganizationProps } from "../../App";

interface ListProps {
  data: OrganizationProps[];
  view: "list" | "detail";
}

export default ({ data, view }: ListProps) => {
  return (
    <List>
      {data.map((organization, key) => (
        <ListItem key={key}>
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
