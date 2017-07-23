<style scoped="" lang="scss">
    @import '../scss/components/scorch-card';
</style>

<template>
    <div class="card-container">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            depth: {
                type: Number,
                required: false,
            },
        },
    };
</script>
