/* eslint-disable */

export default {
    watchConsoleErr(errArr) {
        const vanillaErr = console.err;

        console.err = err => errArr.push(err);
    }
};
