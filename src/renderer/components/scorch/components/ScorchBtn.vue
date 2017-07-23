<style scoped lang="scss">
    @import '../scss/components/scorch-btn';
</style>

<template>
    <div class="scorch button"
        :class="classes">
            <slot></slot>
    </div>
</template>

<script>
    const validContexts = [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'default',
    ];

    const validTexts = [
        'light',
        'dark',
    ];

    export default {
        name: 'scorch-btn',
        props: {
            context: {
                type: String,
                default: 'default',
                validator(val) {
                    return validContexts.includes(val);
                },
            },
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
        data() {
            return {};
        },
        mounted() {
            // this.hoverEnterAnim = {
            //     targets: this.$el,
            //     backgroundColor:
            //         color(this.btnStyle.backgroundColor).lighten(0.15).saturate(0.25).hex(),
            //     boxShadow: `
            //         0px 4px 15px 1px ${color(this.btnStyle.backgroundColor).hex()},
            //         inset 0px 2px 20px 0px ${color(this.btnStyle.backgroundColor).saturate(0.5)}
            //     `,
            //     translateY: '-1px',
            //     scale: 1.01,
            //     duration: 333,
            //     easing: 'easeInOutCirc',
            // };
            //
            // this.hoverLeaveAnim = {
            //     targets: this.$el,
            //     backgroundColor: color(this.btnStyle.backgroundColor).hex(),
            //     boxShadow: this.btnStyle.boxShadow,
            //     translateY: 0,
            //     scale: 1,
            //     duration: 333,
            //     easing: 'easeInOutCirc',
            // };
        },
        computed: {
            classes() {
                const isDisabled = this.disabled ? 'disabled' : '';

                return [
                    this.context,
                    `${this.text}-text`,
                    isDisabled,
                ];
            },
        },
    };
</script>
