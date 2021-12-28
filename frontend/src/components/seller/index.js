import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { Card, Row, Col, Button } from "react-bootstrap";
import "./seller.css";
import { useSelector } from "react-redux";

export const OneSeller = () => {
  const state = useSelector((state) => {
    return {
      token: state.token.token,
    };
  });
  const [data, setData] = useState(0);

  let id = useParams().id;

  const sendAppointment = (appointment, sellerId) => {
    if (!state.token) {
      swal({
        title: "You have to login first so you can Send Appointment",
        icon: "error",
        button: "OK",
      });
      return;
    }

    axios
      .post(
        `http://localhost:5000/reservation`,
        { appointment, sellerId },
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((result) => {
        console.log(result);
        swal({
          title: "Send Appointment Success ",
          icon: "success",
          button: "OK",
        });
      })
      .catch((err) => {});
  };

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/appointment/seller/${id}`)
      .then((res) => {
        setData(res.data.appointment);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="oneSeller">
      <div className="container">
        <Card>
          <Card.Header>Available appointment </Card.Header>
          <Card.Body>
            <Card.Title>
              Seller Name: {data && data[0].sellerId.firstName}{" "}
              {data && data[0].sellerId.lastName}
            </Card.Title>
            <Card.Text>Please Take the appointment that suits you .</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="container">
        <Row xs={1} md={4} className="g-4">
          {data &&
            data.map((element, index) => {
              return (
                <Col key={element._id}>
                  <Card
                    style={{ textAlign: "left", width: "100%", height: "100%" }}
                  >
                    <Card.Body>
                      <Card.Text style={{ fontSize: "18px" }}>
                        Date: {element.date}
                      </Card.Text>

                      <Card.Text style={{ fontSize: "18px" }}>
                        Description: {element.description}
                      </Card.Text>
                      <Button
                        onClick={() =>
                          sendAppointment(element._id, element.sellerId._id)
                        }
                      >
                        bookNow
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
};
