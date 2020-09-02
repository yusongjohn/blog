import React from 'react';

export default class Test extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 1
        }
    }

    handleClick(){
        this.setState({count: 2}, function(preState, pops){
            console.log(this.state.count);
            debugger
            this.setState({
                count: 3
            })
        })

        // this.setState({count: 3}, function(preState, pops){
        //     console.log(this.state.count)
        // })
    }

    componentDidUpdate(){
        console.log(this.state.count)
    }

    render(){
        return <div onClick={this.handleClick.bind(this)}>{this.state.count}</div>
    }
}
