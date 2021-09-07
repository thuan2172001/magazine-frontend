import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export class ModalProgressBar extends React.Component {
  [x: string]: any;
  animateTimeout: any;
  stopAnimateTimeout: any;
  state = {
    width: 0,
    routeChanged: false,
  };

  componentDidMount() {
      this.animate()
  }

  animate() {
    this.animateTimeout = setTimeout(() => {
      if (this.state.width <= 100) {
        this.setState({ width: this.state.width + 10 });
        this.animate();
      } else {
        this.stopAnimate();
      }
    }, 10);
  }

  stopAnimate() {
    clearTimeout(this.animateInterval);
    this.stopAnimateTimeout = setTimeout(() => {
      this.setState({ width: 0 });
    }, 300);
  }

  componentWillUnmount() {
    if (this.stopAnimateTimeout) {
      clearTimeout(this.stopAnimateTimeout);
    }
    if (this.animateTimeout) {
      clearTimeout(this.animateTimeout);
    }
  }

  render() {
    return (
      <ProgressBar variant={'success'} animated now={this.state.width} style={{ height: '3px', width: '100%' }} />
    );
  }
}
