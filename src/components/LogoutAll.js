import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import "fontsource-roboto";
function LogoutAll() {
  const [logout, setLogout] = useState(false);

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          axios.post(
            "https://petkovski-calculator-be.herokuapp.com/users/logoutAll"
          );
          setLogout(true);
        }}
      >
        Logout All
      </Button>
      {logout && <Redirect to={"/"} key={"me"} />}
    </div>
  );
}

export default LogoutAll;
