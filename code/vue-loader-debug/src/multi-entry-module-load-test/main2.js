import { A } from './a'
import B from './b'

console.log(A,'------main2')
B();

setTimeout(()=>{
    import('./c').then(C => {        
        console.log(A,'------main2')
        C.default()
        console.log(A,'------main2')
    })
},1000)

console.log(A,'------main2')