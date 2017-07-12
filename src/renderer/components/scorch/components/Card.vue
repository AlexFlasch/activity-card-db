<style scoped="" lang="scss">
    .card-container {
        background-color: #F2F1EF;

        border-width: 1px;
        border-style: solid;
        border-color: darken(#F2F1EF, 2.5%);
        border-radius: 3px;

        box-shadow: 0px 3px 15px 0px rgba(108, 122, 137, 0.4);
    }
</style>

<template>
    <div class="card-container">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'card',
    };
</script>
