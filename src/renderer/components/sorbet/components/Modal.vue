<style scoped lang="scss" >
    @import "../scss/components/sorbet-modal";
</style>

<template>
    <div class="sorbet">
        <div class="modal-container" :class="classes" @click.stop>
            <div class="titlebar">
                <slot name="header"></slot>
                <div class="close-icon" @click="closeModal()">
                    <icon :name="closeIcon"></icon>
                </div>
            </div>
            <div class="content">
                <slot></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="modal-backdrop" :class="classes" @click="backdropClick()"></div>
    </div>
</template>

<script>
    import * as Icon from './Icon';

    export default {
        name: 'modal',
        components: {
            Icon,
        },
        props: {
            open: {
                type: Boolean,
                required: true,
            },
            closeIcon: {
                type: String,
                required: false,
                default: 'fe-x',
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
            closeModal() {
                this.$emit('update:open', false);
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
