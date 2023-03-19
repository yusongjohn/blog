import React from 'react';

const Context = React.createContext();

class Child extends React.Component {
  static contextType = Context;

  constructor(props){
    super(props);
  }

  render(){
    return <div>{this.context.name}</div>;
  }
}


function MiddleCompo(){
  return <Child/>;
}

export class WrapperCompo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'ys',
    };
  }

  // 仅仅为了触发更新
  handleClick = () => {
    this.setState({
      name: 'sq',
    });
  };

  render(){
    return <Context.Provider value={{ name: 'yus' }}>
      <div onClick={this.handleClick.bind(this)}>
        <div>
          <MiddleCompo></MiddleCompo>
        </div>
      </div>
    </Context.Provider>;
  }
}
