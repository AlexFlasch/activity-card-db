<style scoped="" lang="scss">
    @import '../scss/components/scorch-card';
</style>

<template>
    <div class="scorch card-container" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            depth: {
                required: false,
                default: 1,
                validator(val) {
                    if(typeof val === 'string') {
                        val = parseInt(val, 10);
                    }

                    return val <= 5 && val >= 0;
                },
            },
        },
        computed: {
            classes() {
                const depthClass = `depth-${this.depth}`;

                return [
                    depthClass,
                ];
            },
        },
    };
</script>
