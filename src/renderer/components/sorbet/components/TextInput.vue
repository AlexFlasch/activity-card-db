<style lang="scss">
    @import "../scss/components/sorbet-text-input";
</style>

<template>
    <label class="sorbet input-container">
        <input class="sorbet-input" :class="classes" :type="type" :value="value" @input="updateModel($event.target.value)">
        <span class="sorbet-label">
            {{ label }}
        </span>
    </label>
</template>

<script>
    const inputTypes = [
        'text',
        'number',
        'password',
        'email',
        'url',
    ];

    export default {
        name: 'text-input',
        model: {
            prop: 'value',
            event: 'input',
        },
        props: {
            type: {
                type: String,
                required: false,
                default: 'text',
                validator(val) {
                    return inputTypes.includes(val);
                },
            },
            value: {
                type: String,
                required: false,
                default: '',
            },
            label: {
                type: String,
                required: false,
                default: '',
            },
        },
        methods: {
            updateModel(modelVal) {
                this.$emit('input', modelVal);
            },
        },
        computed: {
            classes() {
                return {
                    active: this.value.length > 0,
                };
            },
        },
    };
</script>
