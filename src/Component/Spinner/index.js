import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import './index.scss';

export default class FullScreenSpinner extends Component {   
    componentDidMount() {
      setTimeout(() => {
        this.props.functionReturningPromise && this.props.functionReturningPromise()
          .then(this.props.onResolve)
          .catch(this.props.onReject);
      });
    }

    render() {
      return <div className="fullscreen-spinner">
        <Spinner name="circular" color="white" fadeIn="none" />
      </div>;
    }
}
