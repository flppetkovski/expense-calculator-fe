import React, { Component } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Footer from "./Footer";
import Appbar from "./Appbar";
import Avatar from '@material-ui/core/Avatar';
import Menu2 from "./Menu";
import { Button } from "@material-ui/core";
import "fontsource-roboto";
import Profile_pic from "../img/profile_pic.png"
import { Redirect, Link } from "react-router-dom";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';



export default class Replace extends Component {

  state = {

    selectedFile: null,
    profile: {},
    image: false,
    products: false,
show: false,
loader: false
  };
  fileSelectedHandler = event   => {
    this.setState({ selectedFile: event.target.files[0] });
   
  };

  setLoader = async ()=>{
 await axios.get(
        "https://petkovski-calculator-be.herokuapp.com/users/me").then(data => this.setState({profile:data.data}, ()=>{
        this.setState({loader: true})
          
        }))  }
   componentDidMount () {
this.setLoader()    
  }


 
   
  fileUploadHandler = () => {
    const  headers = {
        "Content-Type": "application/json"
    }
    const formData = new FormData();
    formData.append("avatar", this.state.selectedFile);
    axios.post(
       "https://petkovski-calculator-be.herokuapp.com/users/me/avatar",
            formData, {"headers": headers}
    ).then( (res)=>  {
    })
this.setState({image:true});

  };

fileDeleteHandler = ()=>{
  axios.delete(
              "https://petkovski-calculator-be.herokuapp.com/users/me/avatar"
            )
  this.setState({products:true});
}

  render() {
    return (
      <div>
        <Appbar
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="logo"></div>
           
          </div>
 <div  style={{marginLeft: "auto", display: "inline-block", marginTop:"0.3rem", marginBottom:"0.3rem", marginRight: "0.5rem"}}>

 <Avatar src={`https://petkovski-calculator-be.herokuapp.com/users/${this.state.profile._id}/avatar`}/>
       

          
          </div>
          <Box component="span" mr={4}>
            {" "}
            <Menu2 />
          </Box>
        </nav>
      </Appbar>
<Box mt={5} ml={11}>
            <button
              style={{
                borderRadius: ".7rem",
                padding: "0.5rem",
                textDecoration: "none",
               backgroundColor: "#64b5f6",
               border: "	#A9A9A9",
color: "#A9reA9A9",
                boxShadow: "0.25rem 0.2rem 0.15rem #A9A9A9",
                transition: "0.2s all ease",
                 ":hover": {
                boxShadow: "0.10rem 0.05rem 0.150rem black",
                cursor:"pointer",
                color: "black"
              }}}
              variant="outlined"
              size="small"
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/dashboard"
              >
           <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
              <ChevronLeftIcon/>
                DASHBOARD PAGE
                </div>
              </Link>
            </button>
</Box>



<Box ml={45.3} mt={4} mb={3}>  <Avatar  style={{height: 200, width: 200}} src={`https://petkovski-calculator-be.herokuapp.com/users/${this.state.profile._id}/avatar`}/> </Box> 
   {this.state.image && <Redirect to={"/dashboard"} />}
               

            
          
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 1000, height: 50 }}>
      <div>
      <Box ml={5.2}>
        <Box mt={10}>
          <input
            style={{ flex: "1 1" }}
            type="file"
            onChange={this.fileSelectedHandler}
          />
        </Box>
        <Box mt={3} >
          <Button
            style={{ flex: "1 1" }}
            color="primary"
            variant="contained"
            onClick={this.fileUploadHandler}
          >
            Submit
          </Button>
        </Box>
        </Box>



        </div>
        <Footer />
                         {this.state.products && <Redirect to={"/dashboard"}/>}

      </div>
      </div>
    );
  }
}
