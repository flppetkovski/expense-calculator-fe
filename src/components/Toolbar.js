import React from "react";

function Toolbar() {
  return (
    <div>
      <div>
        <Appbar
          style={{
            display: "flex",
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
              }}
            >
              <div className="logo"></div>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  margin: "5px 15px 5px 0px",
                }}
                to="/users/me"
              >
                My profile
              </Link>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  margin: "5px 15px 5px 0px",
                }}
                to="/users/me/avatar"
              >
                Avatar Page
              </Link>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  margin: "5px 15px 5px 0px",
                }}
                to="/users/me/edit"
              >
                Edit profile
              </Link>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  margin: "5px 15px 5px 0px",
                }}
                to="/products"
              >
                See Products
              </Link>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  margin: "5px 15px 5px 0px",
                }}
                to="/product"
              >
                Create Product
              </Link>
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  margin: "5px 15px 5px 0px",
                }}
                to="/product"
              >
                Edit Product
              </Link>
            </div>
            <Login
              style={{
                marignLeft: "auto",
              }}
            />
            <Menu />
          </nav>
        </Appbar>
        <div className="container">
          <div className="image-container"></div>
          <div className="signUpForm-container">
            <Form />
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Form} />
          <Route exact path="/users/me" component={Me} />
          <Route exact path="/users/me/avatar" component={Replace} />
          <Route path="/users/me/edit" component={EditProfile} />
          <Route exact path="/products" component={Products} />
          <Route path="/product" component={CreateProduct} />
          <Route exact path="/products/:id" component={EditProduct} />
        </Switch>
      </div>
    </div>
  );
}

export default Toolbar;
