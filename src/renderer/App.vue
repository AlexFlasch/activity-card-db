<style lang="scss">
    @import "components/sorbet/scss/settings";
    @import "components/sorbet/scss/contexts";
    @import "components/sorbet/feather-icons/feather-icons.scss";
    @import "components/sorbet/raleway/raleway.css";

    html,body {
        min-height: 100%;
        min-width: 100%;

        margin: 0;
    }

    body {
        background-color: $bodyBg;

        font-family: 'Raleway';
        font-weight: $defaultFontWeight;
        font-size: $fontSize;
    }

    #app {
        margin: 5px;
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
