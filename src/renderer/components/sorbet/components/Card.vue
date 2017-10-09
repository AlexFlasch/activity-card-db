<style scoped lang="scss">
    @import '../scss/components/sorbet-card';
</style>

<template>
    <div class="sorbet card-container" :class="classes">
        <slot name="primary-icon"></slot>
        <slot name="secondary-icon"></slot>
        <div class="card-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            depth: {
                required: false,
                default: 1,
                type: [Number, String],
                validator(val) {
                    if(typeof val === 'string') {
                        val = parseInt(val, 10);
                    }

                    return val <= 5 && val >= 0;
                },
            },
            hover: {
                required: false,
                default: false,
                type: [Boolean, String],
                validator(val) {
                    let valid = true;

                    if(typeof val === 'string') {
                        valid = (val === 'true' || val === 'false');
                    }

                    return valid;
                },
            },
        },
        computed: {
            classes() {
                const depthClass = `depth-${this.depth}`;
                const hoverClass = this.hover || this.hover === 'true'
                    ? 'hover'
                    : '';

                return [
                    depthClass,
                    hoverClass,
                ];
            },
        },
    };
</script>
