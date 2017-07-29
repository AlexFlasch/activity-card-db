<style scoped lang="scss">

</style>

<template>
    <div class="home-container">
        <card depth="1" v-for="fileName in csvFiles" :key="fileName">
            {{ fileName }}
        </card>
        <card depth="0">
            Add a new year
        </card>
    </div>
</template>

<script>
    import util from 'util';

    import store from './../store';

    // const csvActions = store.modules.csv.actions;

    console.log(util.inspect(store));
    debugger;

    export default {
        name: 'Home',
        vuex: {
            getters: {
                csvFiles: state => state.csvFiles,
            },
            actions: {
                csvActions: '',
            },
        },
    };
</script>
