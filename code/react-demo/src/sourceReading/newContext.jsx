import React from 'react';

const ThemeContext = React.createContext('light');

export class NewContext extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      color: 'red',
    };
  }

  handleClick(){
    this.setState({
      color: 'pink',
    });
  }

  render(){
    return (
      <ThemeContext.Provider value={this.state.color}>
        <Middle/>
        <div onClick={this.handleClick.bind(this)}>点击</div>
      </ThemeContext.Provider>
    );
  }
}

class Middle extends React.Component {
  // static contextType = ThemeContext;

  shouldComponentUpdate(nextProps, nextState, nextContext){
    return false;
  }

  render(){
    return <Child/>;
  }
}

class Child extends React.Component {
  render(){
    return <ThemeContext.Consumer>
      {
        (value) => <div>{value}</div>

      }
    </ThemeContext.Consumer>;
  }
}
