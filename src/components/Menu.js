import React, {useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DvrIcon from '@material-ui/icons/Dvr';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import DehazeIcon from "@material-ui/icons/Dehaze";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
const [edit, setEdit] = useState(false)
const [me, setMe] = useState(false)
const [products, setProducts] = useState(false)
const [logout, setLogout] = useState(false)
const [logoutAll, setLogoutAll] = useState(false)
const [avatar, setAvatar] = useState(false)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let history = useHistory();
  return (
    <div>
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <DehazeIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
setMe(true)
              handleClose()
            }}
            primary="My Profile"
          />
        </StyledMenuItem>




 <StyledMenuItem>
          <ListItemIcon>
            <DvrIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
setProducts(true)
                            handleClose()

            }}
            primary="Dashboard Page"
          />
        </StyledMenuItem>




        <StyledMenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              setEdit(true)
                            handleClose()

            }}
            primary="Edit Profile"
          />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
setAvatar(true)
                            handleClose()

            }}
            primary="Edit Avatar"
          />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <CancelPresentationIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            onClick={() => {
              axios.post(
                "https://petkovski-calculator-be.herokuapp.com/users/logout"
              );
              setLogout(true)
              
                            handleClose()

            }}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Logout All"
            onClick={() => {
              axios.post(
                "https://petkovski-calculator-be.herokuapp.com/users/logoutAll"
              );
              setLogoutAll(true)
                            handleClose()

            }}
          />
        </StyledMenuItem>
      </StyledMenu>
    </div>
    {edit && <Redirect to="/users/me/edit"/>}
    {me && <Redirect to="/users/me"/>}
    {logout && <Redirect to="/"/>}
    {logoutAll && <Redirect to="/"/>}
    {avatar && <Redirect to="/users/me/avatar"/>}
    {products && <Redirect to="/dashboard"/>}
    </div>
  );
}
