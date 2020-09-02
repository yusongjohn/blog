import React from 'react';
import PropTypes from 'prop-types';

class ContextConsumer extends React.Component {
  constructor(props){
    super(props);
  }

  static contextTypes = {
    propA1: PropTypes.string,
    propA2: PropTypes.string,
  };

  render(){
    const {
      propA1, propA2,
    } = this.context; // mountClassInstance  instance.context = xxx

    return (
      <div>{propA1} {propA2}</div>
    );
  }
}

class ContextProvider1 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'ys_1',
    };
  }

  static childContextTypes = {
    propA1: PropTypes.string,
    methodA1: PropTypes.func,
  };

  // 返回Context对象，方法名是约定好的
  getChildContext(){
    return {
      propA1: this.state.name,
      methodA1: () => 'methodA_2',
    };
  }

  // 仅仅为了触发更新
  handleClick = () => {
    this.setState({
      name: 'sq_1',
    });
  };

  render(){
    return <div onClick={this.handleClick.bind(this)}><ContextProvider2/></div>;
  }
}


class ContextProvider2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'ys_2',
    };
  }

  static childContextTypes = {
    propA2: PropTypes.string,
    methodA2: PropTypes.func,
  };

  // 返回Context对象，方法名是约定好的
  getChildContext(){
    return {
      propA2: this.state.name,
      methodA2: () => 'methodA_1',
    };
  }

  // 仅仅为了触发更新
  handleClick = () => {
    this.setState({
      name: 'sq_2',
    });
  };

  render(){
    return <div onClick={this.handleClick.bind(this)}><ContextConsumer/></div>;
  }
}

export class ContextProviderWrapper extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return <ContextProvider1/>;
  }
}
