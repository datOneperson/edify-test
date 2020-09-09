import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => ({
  menu: {
    marginLeft: theme.spacing(2),
  },
}));

interface DelayMenuProps {
  delay: 0 | 1 | 2;
  updateDelay: (delay: 0 | 1 | 2) => void;
}

export default ({ delay, updateDelay }: DelayMenuProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null
  );

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '0') {
        updateDelay(0)
    } else if (event.target.value === '1') {
        updateDelay(1)
    } else if (event.target.value === '2') {
        updateDelay(2)
    }
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClick}>
        Delay
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <RadioGroup
          row
          className={classes.menu}
          name="quiz"
          value={delay}
          onChange={handleRadioChange}
        >
          <FormControlLabel value={0} control={<Radio />} label="0" />
          <FormControlLabel value={1} control={<Radio />} label="1 sec" />
          <FormControlLabel value={2} control={<Radio />} label="2 secs" />
        </RadioGroup>
      </Menu>
    </div>
  );
};
