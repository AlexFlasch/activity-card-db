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

    const iconFamilyType = settings.iconType;
    const iconPrefix = settings.iconPrefix;

    const validIconTypes = [
        'icon-font',
        'svg',
    ];

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

    const fontColors = [
        'light',
        'dark',
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
            iconType: {
                type: String,
                required: false,
                default: iconFamilyType,
                validator(val) {
                    return validIconTypes.includes(val);
                },
            },
            color: {
                type: String,
                required: false,
                validator(val) {
                    const validPredefinedColor = fontColors.includes(val);
                    const validHexColor = /(^#[0-9A-F]{8}$)|(^#[0-9A-F]{4})|(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
                    const validRgbColor = /(^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\))/.test(val);
                    const validRgbaColor = /(^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3})\))/.test(val);
                    const validHslColor = /(^hsl\((\d{1,3}), (\d{1,3}%), (\d{1,3}%)\))/.test(val);
                    const validHslaColor = /(^hsla\((\d{1,3}), (\d{1,3}%), (\d{1,3}%), ((\d{1}\.\d{1,3})|(\d{1}))\))/.test(val);
                    // maybe someday detect browser-specified color names?

                    return validPredefinedColor
                        || validHexColor
                        || validRgbColor
                        || validRgbaColor
                        || validHslColor
                        || validHslaColor;
                },
            },
        },
        data() {
            return {
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

                /* istanbul ignore else */
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

                let iconColor = '';

                if(this.color === 'dark' || this.color === 'light') {
                    iconColor = this.color;
                }

                return [
                    iconPrefix,
                    this.name,
                    iconSize,
                    iconColor,
                ];
            },
            styles() {
                let iconColor = '';

                if(this.color !== 'dark' || this.color !== 'light') {
                    iconColor = this.color;
                }

                const iconFontStyles = {
                    color: iconColor,
                };

                const svgFontStyles = {
                    fill: iconColor,
                };

                switch(this.iconType) {
                    case 'icon-font':
                        return iconFontStyles;
                    case 'svg':
                        return svgFontStyles;
                    default:
                        return iconFontStyles;
                }
            },
        },
    };
</script>
