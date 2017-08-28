<style scoped lang="scss">
    @import "../scss/components/sorbet-text-input";
</style>

<template>
    <label class="sorbet input-container">
        <span class="sorbet-label">
            {{ label }}
        </span>
        <input class="sorbet-input" :type="type" :value="val">
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
            prop: 'val',
            event: 'change',
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
            val: {
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
    };
</script>
