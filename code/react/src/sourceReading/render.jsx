import React from 'react';

// const OtherComponent = React.lazy(() => import('./Test'));
export default class ClickCounter extends React.Component {
  constructor(props){
    super(props);
    this.state = { count: { value: 0 }, array: ['A', 'B', 'C'] };
    this.handleClick = this.handleClick.bind(this);
  }

  // concurrent mode 下该生命周期可能会被执行多次
  componentWillMount(){
    // 这里setState走到scheduleWork会终止，不会继续requestWork（见scheduleWork源码
    this.setState({
      count: { value: 0 },
    });
    // 如果在这里setState多次，多次的状态会被fiber.updateQueue保存下来
    // 在mountClassInstance . processUpdateQueue合并处理
  }

  handleClick(){
    this.setState((state) => {
      return { count: { value: state.count + 1 } };
    });
  }

  changeArray(){
    this.setState({
      array: ['A', 'C', 'B', 'D'],
    });
  }


  // shouldComponentUpdate(nextProps, nextState, nextContext){
  //   // 如果不添加该判断 由于state是不同的对象，因此会重新渲染
  //   // 点击按钮时，会走到finishClassComponent 的第一个return 因为无需继续渲染了，bailout
  //   if (this.state.count.value !== nextState.count.value) {
  //     return true;
  //   }
  // }

  render(){
    // array
    // return [
    //   <button key="1" onClick={this.handleClick}>Update counter</button>,
    //   <span key="2">{this.state.count.value}</span>,
    // ];

    // fragment (有key 无key?
    // return <> test </>;

    // const key = this.state.count.value;
    return <div onClick={this.handleClick}>test</div>;

    // return <div onClick={this.changeArray.bind(this)}>
    //     {
    //       this.state.array.map((value, index) => {
    //         return <div key={value}>{value}</div>;
    //       })
    //     }
    // </div>;

  }
}


export class App1 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      age: 20,
    };
  }

  render(){
    return <div>{this.props.name} : {this.state.age} </div>;
  }
}

export class A2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    };
  }

  // static getDerivedStateFromProps(){
  // }

  // componentWillMount(){
  //   debugger
  // }

  componentWillUnmount(){
    debugger
  }

  componentWillUpdate(){
    // debugger
  }

  componentWillReceiveProps(){
    // debugger
  }

  componentDidMount(){

  }


  handleClick(){
    this.setState({
      data: ['A', 'C', 'F', 'G', 'B', 'D', 'E'],
    });
  }

  getSnapshotBeforeUpdate(){
    // debugger
  }

  render(){

    return (
      <div onClick={this.handleClick.bind(this)}>
        {
          this.state.data.map((item) => {
            return <div key={item}>{item}</div>;
          })
        }
      </div>
    );
  }
}

export class A3 extends React.Component {
  render(){
    return (
      <div key={'A'}>
        <div key={'B'}>
          <div key={'C'}></div>
          <div key={'D'}>
            <div key={'E'}></div>
          </div>
        </div>
        <div key={'F'}></div>
        <div key={'G'}></div>
      </div>
    );
  }
}
