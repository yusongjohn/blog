import React from "react";

// 打印的结果
export default class Example extends React.Component {
    constructor(){
        super();
        this.state = {
            val: 0
        };
    }

    componentDidMount(){
        this.setState({val: this.state.val + 1});
        console.log(this.state.val);    // 第 1 次 log

        this.setState({val: this.state.val + 1});
        console.log(this.state.val);    // 第 2 次 log

        setTimeout(() => {
            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // 第 3 次 log

            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // 第 4 次 log
        }, 0);
    }

    render(){
        return "setStat同步or异步";
    }
};
