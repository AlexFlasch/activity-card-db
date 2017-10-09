function detectInvalidContext(val) {
    const validContexts = [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'default',
    ];

    // none of the validContexts equal the passed in val,
    // therefore val is an invalid context
    return validContexts.every(context => context !== val);
}

/* eslint-disable no-unused-vars */
export default {
    directiveName: 'context',
    inserted(el, binding, vnode) {
        if(detectInvalidContext(binding.value)) {
            /* eslint-disable no-console */
            console.warn('[Vue-Sorbet] v-context was supplied an invalid context on:');
            console.log(vnode.elm);
            /* eslint-enable no-console */
        }

        el.classList.add(binding.value);
    },
};
