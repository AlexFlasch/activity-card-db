<style lang="scss">
    @import "components/sorbet/scss/settings";
    @import "components/sorbet/feather-icons/feather-icons.scss";

    body {
        background-color: $bodyBg;

        font-size: $fontSize;
    }
</style>

<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'activity-card-tracker',
    };
</script>
