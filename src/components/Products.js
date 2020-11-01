import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button } from "@material-ui/core";
import Profile_pic from "../img/profile_pic.png"
import "fontsource-roboto";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import "react-dates/lib/css/_datepicker.css";
import { useStateIfMounted } from "use-state-if-mounted";
import "react-dates/initialize";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { TextField } from "@material-ui/core";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuItem from "@material-ui/core/MenuItem";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Select from "@material-ui/core/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "../Sass/styles.scss";
import Appbar from "./Appbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Menu from "./Menu";
// import Menu from "./Menureplacement";
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [prods, setProds] = useState([]);
  const [text, setText] = useState("");
  const [mappedProds, setMappedProds] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [value, onChange] = useState([
    new Date("2020-10-21"),
    new Date("2020-11-30"),
  ]);
  useEffect(() => {
    (async () => {
      const products = await axios.get(
        "https://petkovski-calculator-be.herokuapp.com/products"
      );
      setProducts(products.data);
      setProds(products.data);
      setMappedProds(
        prods.map((product) => (
          <h1 key={product._id}>
            {product.name} - {product.price}
          </h1>
        ))
      );
      setProds(
        products.data.filter(
          (product) =>
            value == null ||
            (parseInt(moment(product.date).unix()) >=
              parseInt(moment(value[0]).unix()) &&
              parseInt(moment(product.date).unix()) <=
                parseInt(moment(value[1]).unix()) &&
              product.name.toLowerCase().includes(text.toLowerCase()))
        )
      );
    })();
  }, [value]);

    const [profile, setProfile] = useStateIfMounted({});

  useEffect(() => {
    (async () => {
      const user = await axios.get(
        "https://petkovski-calculator-be.herokuapp.com/users/me"
      );

      setProfile(user.data);
    })();
  }, []);

  useEffect(() => {
    const sort = () => {
      prods.sort((a, b) => {
        if (sortBy === "date") {
          return moment(a.date) < moment(b.date) ? 1 : -1;
        } else if (sortBy === "price") {
          return parseInt(a.price) < parseInt(b.price) ? 1 : -1;
        }  if (sortBy === "low_date") {
          return moment(a.date) < moment(b.date) ? -1 : 1;
        } else if (sortBy === "low_price") {
          return parseInt(a.price) < parseInt(b.price) ? -1 : 1;
        }
      });
    };
    sort();
    setMappedProds(
      prods.map((product) => (
        <div className="product__container" key={product._id}>
          <Box mb={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                styles={{ display: "flex", alignItems: "center" }}
              >
                <Box>
                  <Typography className={classes.heading}>
                    {product.name} - ${product.price} -{" "}
                    {moment(product.date).format("MMMM Do, YYYY")}{" "}
                  </Typography>
                </Box>
                <div
                  className="product__buttons"
                  styles={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="span"
                    mr={2}
                    styles={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      size="small"
                      className="delete_button"
                      color="secondary"
                      onClick={() => {
                        axios.delete(
                          `https://petkovski-calculator-be.herokuapp.com/products/${product._id}`
                        );
                        setProducts(
                          products.filter((item) => item._id !== product._id)
                        );
                        setProds(
                          prods.filter((item) => item._id !== product._id)
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                  <Button size="small" className="edit_button">
                    <Link className="edit" to={`products/${product._id}`}>
                      Edit
                    </Link>{" "}
                  </Button>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align="left" variant={"subtitle2"}>
                  {" "}
                  <strong>Type:</strong> {product.type}
                  <Box> <strong>Description:</strong> {product.description}</Box>
                </Typography>{" "}
              </AccordionDetails>
            </Accordion>
          </Box>
        </div>
      ))
    );
  }, [prods, sortBy, products]);

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
         <Link to="users/me/avatar"> <Avatar src={`https://petkovski-calculator-be.herokuapp.com/users/${profile._id}/avatar`}/></Link>          
          </div>
          <Box component="span" mr={4}>
            <Menu />
          </Box>
        </nav>
      </Appbar>
      <div>
        <Container>
          {" "}
          <div className="products__page">
            <Box mt={2}>
              <Typography variant={"body2"}>
                Number of Expenses: {prods.length}
              </Typography>
              <Typography variant={"h6"}>
                Total Amount: $
                {prods.reduce((acc, cur) => {
                  return acc + cur.price;
                }, 0)}{" "}
              </Typography>
            </Box>
          </div>
          <Box mt={4} mb={3}>
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
                  backgroundColor: "#21b6ae",
                boxShadow: "0.15rem 0.15rem 0.250rem gray",
                cursor:"pointer",
                color: "black"
              },
               ":focus": {
                boxShadow: "0.15rem 0.15rem 0.250rem black",
                cursor:"pointer",
                color: "black"
              },
            }}
         
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/product"
              >
               
              Create Expense
              </Link>
            </button>
          </Box>
          <Box styles={{ display: "flex", alignItems: "center" }}>
            <div className="search__container">
              <Box mb={1}>
                <TextField
                  name="text"
                  fullWidth
                  label="Search Expenses..."
                  value={text}
                  type="text"
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                  onChange={(e) => {
                    let word = e.target.value;
                    setText(word);

                    setProds(
                      products.filter(
                        (product) =>
                          product.name
                            .toLowerCase()
                            .includes(word.toLowerCase()) &&
                          (value == null ||
                            (parseInt(moment(product.date).unix()) >=
                              parseInt(moment(value[0]).unix()) &&
                              parseInt(moment(product.date).unix()) <=
                                parseInt(moment(value[1]).unix())))
                      )
                    );
                  }}
                />
                <Box mt={1}>
                  <DateRangePicker onChange={onChange} value={value} />
                </Box>
              </Box>
              <Box mb={3}>
                <Select
                  value={sortBy}
                  name="sort"
                  onChange={(e) => {
                    setSortBy(e.target.value);
                  }}
                >
                  <MenuItem value="date">
                    <Typography>Sort by date (newest)</Typography>
                  </MenuItem>
                   <MenuItem value="low_date">
                    <Typography>Sort by date (oldest)</Typography>
                  </MenuItem>
                  <MenuItem value="price">
                    {" "}
                    <Typography>Sort by amount (highest)</Typography>
                  </MenuItem>
                  <MenuItem value="low_price">
                    {" "}
                    <Typography>Sort by amount (lowest)</Typography>
                  </MenuItem>
                </Select>
              </Box>
            </div>
          </Box>
          {mappedProds}
        </Container>
      </div>
    </div>
  );
}

export default Products;
