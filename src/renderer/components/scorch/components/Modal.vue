<style scoped lang="scss" >
    @import "../scss/components/scorch-modal";
</style>

<template>
    <div class="scorch modal-backdrop" :class="classes" @click="backdropClick()">
        <div class="modal-container" :class="classes">
            <div class="titlebar">
                <p>{{ titlebar }}</p>
                <div class="close-icon">
                    <icon name="lnr-cross"></icon>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'modal',
        props: {
            open: {
                type: Boolean,
                required: true,
            },
            closeIcon: {
                type: String,
                required: false,
            },
            titlebar: {
                type: String,
                required: false,
                default: '',
            },
            clickAway: {
                type: Boolean,
                required: false,
                default: true,
            },
        },
        methods: {
            backdropClick() {
                if(this.clickAway) {
                    // update prop
                    this.$emit('update:open', false);
                }
            },
        },
        computed: {
            classes() {
                return {
                    shown: this.open,
                };
            },
        },
    };
</script>
