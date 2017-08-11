<style scoped lang="scss">
    .add-year {
        cursor: pointer;
    }
</style>

<template>
    <div class="home-container">
        <!-- <card depth="1" v-for="fileName in csvFiles" :key="fileName">
            {{ fileName }}
        </card> -->
        <card class="centered add-year" depth="0" @click.native="showModal()">
            <icon name="fe-plus-circle"></icon>
            Add a new year
        </card>
        <modal :open.sync="modalOpen">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec sodales metus, sit amet scelerisque nulla. Phasellus sed ornare urna. Vivamus sit amet velit vestibulum, vehicula felis at, suscipit urna. Mauris eleifend, ante eget tempor vehicula, quam sapien tempor nunc, et efficitur justo nulla et est. Curabitur blandit, ante eget efficitur congue, ante erat maximus purus, eu consequat libero justo vitae erat. Nulla vel augue orci. Mauris ut placerat nibh. Aliquam id purus mollis, ultrices magna suscipit, tincidunt diam. Vivamus lacinia nisl id ipsum auctor facilisis.

Sed consectetur velit vel quam tempor dictum ut quis lacus. Vivamus dapibus urna in tortor rutrum condimentum. Aenean malesuada leo in mollis pellentesque. Aliquam turpis sapien, fermentum vel euismod in, imperdiet a lacus. Vestibulum rutrum neque turpis, non elementum nisi interdum a. Pellentesque vulputate tellus id enim dictum fermentum. Quisque sed odio a mi mollis commodo. Donec cursus consequat turpis et volutpat. Duis eleifend erat in augue dictum, et rhoncus lorem lobortis.

Cras euismod tempor lectus, nec placerat orci finibus vulputate. Integer mattis laoreet nulla vel condimentum. Curabitur varius egestas suscipit. Phasellus aliquam quis purus sed dignissim. Nullam vitae posuere ante. Vestibulum id pharetra erat. Fusce placerat, dui nec eleifend suscipit, sapien augue sollicitudin urna, pharetra porttitor nisl risus sit amet odio. Sed sed mi magna. Sed finibus metus egestas leo scelerisque feugiat. Maecenas sit amet est a tortor bibendum aliquet. Ut sit amet consectetur elit, nec iaculis sapien. Ut consectetur odio nibh, quis ullamcorper ligula mattis a. Curabitur vulputate lectus id dolor faucibus bibendum. Vivamus ligula augue, convallis sed diam congue, rhoncus feugiat leo. Morbi eu aliquet erat, a dignissim quam.

Nam laoreet vitae justo quis aliquet. Maecenas congue venenatis augue. Pellentesque eget lacus dolor. Mauris porta ante in justo bibendum, sit amet mollis nisl finibus. Proin nec lorem sed diam tempus luctus. Curabitur scelerisque justo nec tincidunt tempus. Nam sollicitudin dui quis lorem iaculis, eu consectetur ex euismod. Cras et massa lacus. Proin eu mauris nec ex elementum aliquet vitae et eros. Nullam ligula eros, pulvinar quis ultricies sed, gravida nec metus. Maecenas varius eleifend risus et lacinia. Pellentesque maximus eget dui id egestas.

Pellentesque commodo mauris tincidunt nisl vehicula tristique. Curabitur ligula ligula, dictum at enim a, viverra dignissim tellus. Aliquam id feugiat ex, et auctor quam. Praesent cursus libero eget elit aliquam efficitur. Quisque quis eros ac lorem consectetur ullamcorper quis a quam. Morbi pulvinar cursus dui. Etiam ornare sem a neque vestibulum, non tristique est pretium.
        </modal>
    </div>
</template>

<script>
    // import util from 'util';

    // import store from './../store';

    // const csvActions = store.modules.csv.actions;

    // console.log(util.inspect(store));
    // debugger;

    export default {
        name: 'Home',
        data() {
            return {
                modalOpen: false,
            };
        },
        methods: {
            showModal() {
                this.modalOpen = true;
            },
        },
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
