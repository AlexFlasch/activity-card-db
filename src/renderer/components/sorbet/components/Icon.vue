<style scoped lang="scss">
    @import "../scss/components/sorbet-icon";
</style>

<template>
    <svg class="sorbet icon" :class="classes" v-if="iconType === 'svg'">
        <use :xlink:href="hrefName"></use>
    </svg>

    <i class="sorbet icon" :class="classes" v-else-if="iconType === 'icon-font'"></i>

    <p class="sorbet" v-else>{{ iconType }} is not a valid option for iconType in Sorbet settings.</p>
</template>

<script>
    import settings from './../settings';

    const iconType = settings.iconType;
    const iconPrefix = settings.iconPrefix;

    const iconSizes = [
        'xs',
        'extra-small',
        'extra small',
        'sm',
        'small',
        'md',
        'med',
        'medium',
        'lg',
        'large',
        'xl',
        'extra-large',
        'extra large',
    ];

    export default {
        name: 'icon',
        props: {
            name: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: false,
                default: 'md',
                validator(val) {
                    return iconSizes.includes(val);
                },
            },
        },
        data() {
            return {
                iconType,
                iconPrefix,
            };
        },
        computed: {
            hrefName() {
                return `#${this.name}`;
            },
            classes() {
                const xsAliases = ['xs', 'extra-small', 'extra small'];
                const smAliases = ['sm', 'small'];
                const mdAliases = ['md', 'med', 'medium'];
                const lgAliases = ['lg', 'large'];
                const xlAliases = ['xl', 'extra-large', 'extra large']; // EXTRA THICC

                let iconSize = '';

                if(xsAliases.includes(this.size)) {
                    iconSize = 'xs';
                } else if(smAliases.includes(this.size)) {
                    iconSize = 'sm';
                } else if(mdAliases.includes(this.size)) {
                    iconSize = 'md';
                } else if(lgAliases.includes(this.size)) {
                    iconSize = 'lg';
                } else if(xlAliases.includes(this.size)) {
                    iconSize = 'xl';
                }

                return [
                    iconPrefix,
                    this.name,
                    iconSize,
                ];
            },
        },
    };
</script>
