<style lang="scss">
    @import "components/sorbet/scss/index";
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

        & * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    }

    #app {
        margin: 5px;
    }
</style>

<template>
    <div id="app">
        <transition name="slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import electron from 'electron';
    import { mapActions } from 'vuex';

    const currentWindow = electron.remote.getCurrentWindow();

    export default {
        name: 'activity-card-tracker',
        beforeMount() {
            this.setCsvFiles(currentWindow.csvFiles);
            this.setCsvColumns(currentWindow.csvColumns);
        },
        methods: {
            ...mapActions([
                'setCsvFiles',
                'setCsvColumns',
            ]),
        },
    };
</script>
