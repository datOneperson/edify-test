import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ListIcon from "@material-ui/icons/List";
import DetailsIcon from "@material-ui/icons/Details";

interface ViewOptionsProps {
  view: "list" | "detail";
  updateView: (view: "list" | "detail") => void;
}

export default ({ view, updateView }: ViewOptionsProps) => {
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button
        title="List"
        disabled={view === "list"}
        onClick={() => updateView("list")}
      >
        <ListIcon />
      </Button>
      <Button
        title="Detail"
        disabled={view === "detail"}
        onClick={() => updateView("detail")}
      >
        <DetailsIcon />
      </Button>
    </ButtonGroup>
  );
};
