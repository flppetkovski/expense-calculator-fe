import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";
import { Container, Row, Col, Input, Button } from "reactstrap";
import { Formik, Form } from "formik";
import { TextField, Button } from "@material-ui/core";
import "fontsource-roboto";

function ProfilePicture() {
  return (
    <div>
      <div>
        <Container>
          <Row>
            <Col>
              <Formik
                initialValues={{ photo1: "" }}
                onSubmit={(values) => {
                  let data = new FormData();
                  data.append("photo1", values.photo);
                  return fetch(
                    "https://petkovski-calculator-be.herokuapp.com/users/me/avatar",
                    {
                      method: "post",
                      headers: new Headers({
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                      }),
                      body: data,
                    }
                  );
                }}
              >
                {(formProps) => (
                  <Form>
                    <Field
                      type="file"
                      name="photo1"
                      onChange={(event) =>
                        formProps.setFieldValue("photo1", event.target.files[0])
                      }
                    />
                    <Button type="submit">Submit File</Button>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ProfilePicture;
// axios.post("file", formData, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });
// const image = axios.post(
//   `https://petkovski-calculator-be.herokuapp.com/users/me/avatar`
// );
