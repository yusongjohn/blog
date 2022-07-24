import { A } from './a'
import B from './b'

console.log(A,'------ main1')
B();

import('./c').then(C => {
    console.log(A,'------ main1')
    C.default()
    console.log(A,'------ main1')
})
console.log(A,'------ main1')