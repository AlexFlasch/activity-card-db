<style scoped lang="scss">
    .add-year {
        cursor: pointer;
    }
</style>

<template>
    <div class="home-container">
        <card depth="1" v-for="file in csvFiles" :key="file.fileName">
            {{ file.name }}
        </card>
        <card class="centered add-year" depth="0" @click.native="showModal()">
            <icon name="fe-plus-circle"></icon>
            Add a new year
        </card>
        <modal :open.sync="modalOpen">
            <h2 slot="header">New year details:</h2>
            <span v-if="addFileErr" class="error">There was a problem adding the new year. Please try again.</span>
            <text-input label="Year" type="text" v-model="filename" :placeholder="yearPlaceholder"></text-input>
            <btn context="primary" @click="addYear()">Add year</btn>
        </modal>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'Home',
        data() {
            return {
                modalOpen: false,
                addFileErr: false,
                filename: '',
                yearPlaceholder: `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`,
            };
        },
        methods: {
            showModal() {
                this.modalOpen = true;
            },
            async addYear() {
                await this.$store.dispatch('addCsvFile', this.fileOptions);

                this.modalOpen = false;
            },
            ...mapActions([
                'getCsvFiles',
            ]),
        },
        computed: {
            fileOptions() {
                return {
                    name: this.filename,
                };
            },
            ...mapGetters([
                'csvFiles',
            ]),
        },
    };
</script>
