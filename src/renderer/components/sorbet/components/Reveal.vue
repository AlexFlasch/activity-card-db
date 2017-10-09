<style scoped lang="scss">
    @import "../scss/components/sorbet-reveal";
</style>

<template>
    <div class="reveal-container" :class="classes" @click.stop>
        <slot></slot>
        <div class="close-reveal" @click="hideReveal()">
            <icon name="fe-x"></icon>
        </div>
    </div>
</template>

<script>
    import Icon from './Icon';

    const validAnims = [
        'top',
        'left',
        'right',
        'bottom',
        'fade',
    ];

    export default {
        name: 'reveal',
        components: {
            Icon,
        },
        props: {
            open: {
                type: Boolean,
                required: true,
            },
            anim: {
                type: String,
                required: false,
                default: 'bottom',
                validator(val) {
                    return validAnims.includes(val);
                },
            },
        },
        mounted() {
            let parentComponent = this.$parent;

            // reveal was not put in a component...?
            // why are you using this as an app root?
            // uhhh anyway just grab the first parentNode instead...
            if(parentComponent === undefined) {
                parentComponent = this.$el.parentNode;

                parentComponent.classList.add('no-overflow', 'relative');
                this.$el.style.borderRadius = parentComponent.$el.style.borderRadius;
            }

            parentComponent.$el.classList.add('no-overflow', 'relative');

            const parentBorderRadius = getComputedStyle(parentComponent.$el).borderRadius;
            this.$el.style.borderRadius = parentBorderRadius;
        },
        methods: {
            hideReveal() {
                this.$emit('update:open', false);
            },
        },
        computed: {
            classes() {
                return [
                    { open: this.open },
                    `${this.anim}-anim`,
                ];
            },
        },
    };
</script>
