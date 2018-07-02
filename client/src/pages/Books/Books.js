import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
var moment = require('moment');



class Books extends Component {
  state = {
    loan: [],
    payment: "",
    total: ""
  };

  componentDidMount() {
    this.loadBooks();
    
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ loan: res.data })
      )
      .catch(err => console.log(err));
      console.log(this.state);
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.payment) {
      API.saveBook({
        payment: this.state.payment
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Make a Payment</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.payment}
                onChange={this.handleInputChange}
                name="payment"
                placeholder="Amount"
              />
              <FormBtn
                disabled={!(this.state.payment)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              
            </Jumbotron>
            {this.state.loan.length ? (
              <List>
                {this.state.loan.map(loan => (
                  <ListItem key={loan._id}>
                    <Link to={"/books/" + loan._id}>
                      <strong>
                        {loan.payment} on {moment(loan.date).format("MM-DD-YYYY")}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(loan._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
