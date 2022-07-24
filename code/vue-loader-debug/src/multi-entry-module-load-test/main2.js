import { A } from './a'
import B from './b'

console.log(A)
B();

import('./c').then(C => {
    C()
})