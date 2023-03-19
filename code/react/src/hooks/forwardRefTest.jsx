import React, {
  useState,
  useRef,
} from 'react';

/**
 * ----------------------------------------------------------------------------------------------------------
 * forwardRef 中转 获取(函数)子组件中的某个元素
 */
function Child(props, ref){
  return (
    <input type="text" ref={ref}/>
  );
}

Child = React.forwardRef(Child);

export function ForwardRef(){
  let [number, setNumber] = useState(0);
  // 在使用类组件的时候，创建 ref 返回一个对象，该对象的 current 属性值为空
  // 只有当它被赋给某个元素的 ref 属性时，才会有值
  // 所以父组件（类组件）创建一个 ref 对象，然后传递给子组件（类组件），子组件内部有元素使用了
  // ***** 那么父组件就可以操作子组件中的某个元素 ******

  // 但是函数组件无法接收 ref 属性 <Child ref={xxx} /> 这样是不行的 【函数组件没有实例】
  // 所以就需要用到 forwardRef 进行转发
  const inputRef = useRef(); //{current:undefined}
  function getFocus(){
    inputRef.current.value = 'focus';
    inputRef.current.focus();
  }

  return (
    <>
      <Child ref={inputRef}/>
      <button onClick={() => setNumber({ number: number + 1 })}>+</button>
      <button onClick={getFocus}>获得焦点</button>
    </>
  );
}


export class CallbackRef extends React.Component {
  constructor(props){
    super(props);
    this.getRef = function(ele){
      console.log(ele);
    };
  }

  render(){
    return <div>
      <FunCallbackRef ref={this.getRef}/>
    </div>;
  }
}

export class ClassStrRef extends React.Component {
  renderRow = () => {
    return <div>
      <input ref={'input-on-MiddleCompo'}/>
      <input ref={input => {
        this['input-on-ClassStrRef'] = input;
      }
      }/>
    </div>
  };

  componentDidMount(){
    console.log(this);
  }

  render(){
    return <MiddleComp renderRow={this.renderRow}/>;
  }
}

class MiddleComp extends React.Component {
  componentDidMount(){
    console.log(this);
  }

  render(){
    return <div>{
      this.props.renderRow()
    }</div>;
  }
}


// 函数组件
export class StringRef extends React.Component {
  componentDidMount(){
    this.refs.myRef.focus();
  }

  render(){
    return <input ref="myRef"/>;
  }
}

export function FunStrRef(){
  return <input ref="myRef"/>;
}

export function FunCallbackRef(){
  function getRef(ele){
    console.log(ele);
  }

  return <div ref={getRef}></div>;
}

export function FunCreateRef(){
  const a = React.createRef();

  return <div ref={a}></div>;
}


