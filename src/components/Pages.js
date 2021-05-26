import React from "react";
import { connect } from "react-redux";
import Form from "./Form";
import Weather from "./Weather";
import "semantic-ui-css/semantic.min.css";

function Pages(props) {
  return (
    <div className="ui grid">
      <div className="three column row" style={{ marginTop: "10%" }}>
        <div className="column" />
        <div className="column">
          <div className="ui segment">
            {props.page.number === 1 ? (
              <Form />
            ) : props.page.number === 2 ? (
              <Weather />
            ) : (
              <Form />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    page: {
      number: state.pagination.page.number,
    },
  };
};

export default connect(mapStateToProps)(Pages);
