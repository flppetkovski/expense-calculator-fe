import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import DetailsIcon from "@material-ui/icons/Details";
export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const myProfile = () => {
    history.push("/users/me");
    handleClose();
  };

  const logout = (event) => {
    setAnchorEl(event.currentTarget);
    axios.post("https://petkovski-calculator-be.herokuapp.com/users/logout");

    handleClose();
  };

  const logoutAll = (event) => {
    setAnchorEl(event.currentTarget);
    axios.post("https://petkovski-calculator-be.herokuapp.com/users/logoutAll");

    handleClose();
  };

  let history = useHistory();
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <DetailsIcon
          style={{
            color: "white",
          }}
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={myProfile}>My Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
        <MenuItem onClick={handleClose}>Logout All</MenuItem>
      </Menu>
    </div>
  );
}
