<style scoped lang="scss" >
    @import "../scss/components/scorch-modal";
</style>

<template>
    <div class="scorch">
        <div class="modal-container" :class="classes" @click.stop>
            <div class="titlebar">
                <p class="title">{{ title }}</p>
                <div class="close-icon" @click="closeModal()">
                    <icon :name="closeIcon"></icon>
                </div>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
        <div class="modal-backdrop" :class="classes" @click="backdropClick()"></div>
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
                default: 'fe-x',
            },
            title: {
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
