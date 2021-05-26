import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { sendSearch } from "../actions";
import { connect } from "react-redux";

function Form(props) {
  const [location, setLocation] = useState({
    city: "",
  });
  const handleClick = (event, data) => {
    event.preventDefault();
    props.dispatch(sendSearch(data));
    props.dispatch({ type: "NEXT_PAGE" });
  };
  return (
    <div className="comumn">
      <h3 className="ui center aligned header">
        <b>Weather Information</b>
        <br />
      </h3>
      <div className="row">
        <h4 className="ui left aligned header">
          <b>City:</b>
        </h4>
      </div>
      <div className="ui equal width grid">
        <div className="nine wide column">
          <div className="ui fluid input">
            <input
              value={location.city}
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
              placeholder="Enter the location"
            />
          </div>
        </div>
        <div className="column">
          <button
            className="ui primary icon right labeled button"
            onClick={(e) => handleClick(e, location)}
          >
            Search
            <i aria-hidden="true" className="right search icon"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    page: state.page,
  };
};

export default connect(mapStateToProps)(Form);
