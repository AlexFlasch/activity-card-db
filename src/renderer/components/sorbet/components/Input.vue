<style scoped lang="scss">
    @import "../scss/components/sorbet-input";
</style>

<template>
    <div class="input-container">
        <input :type="inputType">
    </div>
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
        name: 'sorbet-input',
        props: {
            type: {
                type: String,
                required: false,
                default: 'text',
                validator(val) {
                    return inputTypes.includes(val);
                },
            },
        },
        data() {
            return {

            };
        },
    };
</script>
