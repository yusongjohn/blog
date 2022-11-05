import {logA} from './a'

function logAB() {
    logA()
    import(/* webpackChunkName: "ChunkB" */ './b').then(asyncModule => asyncModule.logB())
}

logAB()