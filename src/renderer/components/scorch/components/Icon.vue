<style scoped lang="scss">

</style>

<template>
    <svg class="scorch" :class="classes" v-if="iconType === 'svg'">
        <use :xlink:href="hrefName"></use>
    </svg>

    <i class="scorch" :class="classes" v-else-if="iconType === 'icon-font'"></i>

    <p class="scorch" v-else>{{ iconType }} is not a valid option for iconType in Scorch settings.</p>
</template>

<script>
    import settings from './../settings';

    const iconType = settings.iconType;
    const iconPrefix = settings.iconPrefix;

    export default {
        name: 'icon',
        props: {
            name: {
                type: String,
                required: true,
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
                return [
                    iconPrefix,
                    this.name,
                ];
            },
        },
    };
</script>
