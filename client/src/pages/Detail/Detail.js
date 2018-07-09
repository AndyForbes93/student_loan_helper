import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
var moment = require('moment');


class Detail extends Component {
  state = {
    loan: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ loan: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
              <strong>
                        ${this.state.loan.payment} on {moment(this.state.loan.date).format("MM-DD-YYYY")}
                      </strong>
              </h1>
            </Jumbotron>
          </Col>
        </Row>

        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Main</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
