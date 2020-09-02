import React from 'react';

const Context = React.createContext();

export class Child extends React.Component {

    constructor(props){
        super(props);
        this.state = {count: 1};
    }

    // 仅仅为了触发更新
    handleClick(){
        this.setState({
            count: 2,
        });
    };

    render(){
        return <div onClick={this.handleClick.bind(this)}>{this.context.name}</div>;
    }
}
Child.contextType = Context;

export default class WrapperCompo extends React.Component {
    render(){
        return <div>
            <Context.Provider value={{name: 'a'}}>
                <Child></Child>
            </Context.Provider>
            <Context.Provider value={{name: 'b'}}>
                <Child></Child>
            </Context.Provider>
        </div>;
    }
}
