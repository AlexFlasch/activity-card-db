<style scoped lang="scss">
    .scorch {
        &.button {
            position: relative;
            display: inline-block;

            cursor: pointer;

            width: auto;
            height: auto;

            padding-left: 2vw;
            padding-right: 2vw;
            padding-top: 0.75vh;
            padding-bottom: 0.75vh;

            margin: 10px;

            border-radius: 50px;

            background-clip: padding-box;
        }

        &.light-text {
            color: #E4F1FE;
            text-shadow: 0px 0px 2px rgba(#22313F, 0.7);
        }

        &.dark-text {
            color: #22313F;
            text-shadow: 0px 0px 2px rgba(#E4F1FE, 0.7);
        }
    }

    .click-container {
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div class="scorch button"
        :class="classes"
        :style="btnStyle"
        @mouseenter.prevent="hoverEnter"
        @mouseleave.prevent="hoverLeave">
        <div class="click-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import anime from 'animejs';
    import color from 'color';

    import settings from './../settings';

    const primaryStyle = {
        backgroundColor: settings.primaryColor,
        boxShadow: `
            0px 3px 15px 0px ${color(settings.primaryColor).alpha(0.6)},
            inset 0px 2px 20px 0px ${color(settings.primaryColor).saturate(0.5)}
        `,
    };

    const secondaryStyle = {
        backgroundColor: settings.secondaryColor,
        boxShadow: `
            0px 3px 15px 0px ${color(settings.secondaryColor).alpha(0.6)},
            inset 0px 2px 20px 0px ${color(settings.secondaryColor).saturate(0.5)}
        `,
    };

    export default {
        name: 'scorch-btn',
        props: {
            disabled: Boolean,
        },
        data() {
            return {
                btnStyle: {},
                hoverEnterAnim: anime({}),
                hoverLeaveAnim: anime({}),
            };
        },
        mounted() {
            // primary is default, therefore, it will be primary unless specified as secondary
            this.secondary = this.$el.attributes.getNamedItem('secondary') !== null;
            this.primary = this.$el.attributes.getNamedItem('primary') || !this.secondary;

            this.btnStyle = this.secondary && !this.primary
                ? secondaryStyle
                : primaryStyle;

            this.hoverEnterAnim = {
                targets: this.$el,
                backgroundColor:
                    color(this.btnStyle.backgroundColor).lighten(0.15).saturate(0.25).hex(),
                boxShadow: `
                    0px 4px 15px 1px ${color(this.btnStyle.backgroundColor).hex()},
                    inset 0px 2px 20px 0px ${color(this.btnStyle.backgroundColor).saturate(0.5)}
                `,
                translateY: '-1px',
                scale: 1.01,
                duration: 333,
                easing: 'easeInOutCirc',
            };

            this.hoverLeaveAnim = {
                targets: this.$el,
                backgroundColor: color(this.btnStyle.backgroundColor).hex(),
                boxShadow: this.btnStyle.boxShadow,
                translateY: 0,
                scale: 1,
                duration: 333,
                easing: 'easeInOutCirc',
            };
        },
        methods: {
            hoverEnter() {
                anime(this.hoverEnterAnim);
            },
            hoverLeave() {
                anime(this.hoverLeaveAnim);
            },
        },
        computed: {
            classes() {
                // if for some reason they choose both
                // primary and secondary styles, default to primary
                if(this.primary && this.secondary) {
                    this.primary = true;
                    this.secondary = false;
                }

                debugger;

                const requiresDarkText = this.secondary
                    ? color(settings.secondaryColor).light()
                    : color(settings.primaryColor).light();

                return {
                    primary: this.primary && !this.secondary,
                    secondary: this.secondary && !this.primary,
                    'dark-text': requiresDarkText,
                    'light-text': !requiresDarkText,
                };
            },
            style() {
            },
        },
    };
</script>
