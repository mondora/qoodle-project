import Countdown from 'react-cntdwn';
import React, { Component } from "react";
import { Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Timer extends Component {


  static propTypes = {
    closingQoodle: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    onFinished: PropTypes.func.isRequired,
  }

  render() {

    const dateFormat = {
      day: 'dd giorni ',
      hour: 'hh ore ',
      minute: 'mm minuti ',
      second: ' e ss secondi '
    }
    return (
      <div id="popover-div">
        <Popover
          id="popover-basic"
          placement="right"
          title={this.props.title}
        >

          <strong>
            <Countdown targetDate={this.props.closingQoodle}
              interval={1000}
              startDelay={2000}
              timeSeparator={'  '}
              leadingZero
              onFinished={this.props.onFinished}
              format={dateFormat} />

          </strong>

        </Popover>
      </div>
    )
  }

}
