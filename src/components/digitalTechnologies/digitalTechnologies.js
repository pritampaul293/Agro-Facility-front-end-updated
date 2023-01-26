import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../Ecom/Ecom.css";

function TabPanel(props) {
  const { children, ...other } = props;

  return (
    <div
      role="tabpanel"
      {...other}
    >
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
    
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function DigitalTechnologies() {
  const [value, setValue] = React.useState(0);
  const [technologies, setTechnologies] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/digitalTechnologies/all").then((res) => {
      setTechnologies(res.data);
      setShowLoader(false)
    });
    axios.get("http://localhost:5000/productCategory").then((res) => {
      if (res.data) {
        setCategoryList(res.data)
      }
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Row >
        <Col sm={2}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", width: "200px" }}
          >
            {categoryList.map((v, k) => (
              <Tab key={v._id} label={v.title} {...a11yProps(k)} />
            ))}
          </Tabs>
        </Col>
        <Col sm={10}>
          <TabPanel className="tabPanel">

            {showLoader ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Row sm={12} md={6} lg={4} w={100} className="techItems">
                {technologies
                  .filter((tech) => tech.categoryId === categoryList[value]?._id)
                  .map(({ title, picture, price, des, _id }) => {
                    return (
                      <Card
                        className="Ecard"
                      // style={{ width: "15rem", height: "20rem" }}
                      >
                        <Link to={`/digitalTechnologies/${_id}`}>
                          <Card.Img
                            variant="top"
                            className="Eimages"
                            src={picture}
                          />
                          <Card.Body>
                            <Card.Title
                              style={{ color: "black", fontSize: "22px" }}
                            >
                              {title}
                            </Card.Title>
                            <Card.Text
                              style={{ color: "#666", lineHeight: 1.6 }}
                            >
                              {des.slice(0, 90)}...
                            </Card.Text>
                            <Card.Text
                              style={{ color: "#333", fontSize: "18px" }}
                            >
                              ৳{price}
                            </Card.Text>
                          </Card.Body>
                        </Link>
                      </Card>
                    );
                  })}
              </Row>
            )}
          </TabPanel>
        </Col>
      </Row>
    </>
  );
}
