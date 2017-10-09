<style scoped lang="scss">
    @import '../scss/components/sorbet-btn';
</style>

<template>
    <div class="sorbet btn"
        :class="classes">
            <slot></slot>
    </div>
</template>

<script>
    const validTexts = [
        'light',
        'dark',
    ];

    export default {
        name: 'btn',
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            text: {
                type: String,
                default: 'light',
                validator(val) {
                    return validTexts.includes(val);
                },
            },
        },
        computed: {
            classes() {
                const isDisabled = this.disabled ? 'disabled' : '';

                return [
                    `${this.text}-text`,
                    isDisabled,
                ];
            },
        },
    };
</script>
