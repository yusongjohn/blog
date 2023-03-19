import React from 'react';

class Inner extends React.Component {

  handleClick(){
    console.log('Inner');
  }

  render(){
    return <div onClick={this.handleClick.bind(this)}>点击Inner</div>;
  }
}

export class Outer extends React.Component {

  handleClick(){
    console.log('Outer');
  }

  render(){
    return <div onClick={this.handleClick.bind(this)}>
      点击Outer
      <Inner></Inner>
    </div>;
  }
}
