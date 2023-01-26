import React, { Component, Fragment } from "react";
import Ecom from "../components/Ecom/Ecom";
import PageTop from "../components/PageTop/PageTop";

class EcomPage extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }
  render() {
    return (
      <Fragment>
        <PageTop pagetitle="ই-কমার্স" />
        <Ecom />
      </Fragment>
    );
  }
}

export default EcomPage;
