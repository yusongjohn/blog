import React from 'react';

export class CocurrentMode extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
    };
    this.buttonRef = React.createRef();
  }

  componentDidMount(){
    const button = this.buttonRef.current;
    setTimeout(() => this.setState({ count: 1 }), 500);
    setTimeout(() => button.click(), 600);
  }

  handleButtonClick = () => {
    this.setState( prevState => ({ count: prevState.count + 2 }) )
  }

  render(){
    return <div>
      <button ref={this.buttonRef} onClick={this.handleButtonClick.bind(this)}>增加2</button>
      <div>
        {Array.from(new Array(8000)).map((v, index) =>
          <span key={index}>{this.state.count}</span>,
        )}
      </div>
    </div>;
  }
}
