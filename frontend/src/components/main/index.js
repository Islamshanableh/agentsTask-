
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card,Row,Col,Button} from "react-bootstrap";
import "./main.css";
const Main = () => {
  const history = useHistory();
  const state = useSelector((state) => {
    return {
      search: state.search.search,
    };
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setData([...res.data.seller]);
      });
  }, []);
  
  return (
    <div className="allSeller">
    <div className="container">
        <Row xs={1} md={4} className="g-4">
          {data &&
            data.filter((val) => {
              if (state.search == "") {
                return val;
              } else if (
                val.firstName.toLowerCase().includes(state.search.toLowerCase()) ||
                val.lastName.toLowerCase().includes(state.search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((element, index) => {
              return (
                <Col key={element.id}  >
                  <Card
                    style={{ textAlign: "left", width: "100%", height: "100%" }}
                  >
                    <Card.Img
                      variant="top"
                      src="https://serving.photos.photobox.com/529350877ae5c0fe8d7d658549358b6ec757a497a906d9915ee477715e49eda9814304c1.jpg"
                      height="200px"
                      width="200px"
                    />
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "18px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      
                      >
                        {element.firstName + " " + element.lastName}{" "}
    
                      </Card.Title>
                      
                      <Card.Text
                        style={{ fontSize: "18px" }}
                       
                      >
                        Email: {element.email} 
                      </Card.Text>
                      
                      <Card.Text style={{ fontSize: "18px" }}>
                       Phone: {element.phoneNumber}
                      </Card.Text>
                      <Button onClick={() => history.push(`/detail/${element._id}`)}>bookNow</Button>
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

export default Main;
