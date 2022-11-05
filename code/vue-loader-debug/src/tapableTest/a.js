/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
*/
"use strict";

class HookCodeFactory {
    create(options) {
        this.init(options);
        let fn;
        switch (this.options.type) {
            case "sync":
                fn = new Function(
					this.args(),
					'"use strict";\n' +
						this.header() +
						this.content(/**... */)
				);
                break;
            case "async":
                fn = new Function(/** ... */);
                break;
            case "promise":
                fn = new Function(/** ... */);
                break;
        }
        return fn;
    }

    callTap(tapIndex, { onError, onResult, onDone, rethrowIfPossible }) {
        switch (tap.type) {
            case "sync":
                break;
            case "async":
                break;
            case "promise":
                break;
        }
        return code;
    }
}
