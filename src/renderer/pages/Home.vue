<style scoped lang="scss">
    .add-year {
        cursor: pointer;
    }
</style>

<template>
    <div class="home-container">
        <card class="centered"
              depth="1"
              hover="true"
              v-for="filename in csvFiles"
              :key="filename"
              @click.native="viewFile(filename)">
            <reveal class="centered" :open.sync=""
            <icon slot="primary-icon" name="fe-file" color="dark"></icon>
            View {{ stripFileExtension(filename) }}
        </card>
        <card class="centered add-year" depth="0" @click.native="showReveal()">
            <reveal class="centered" :open.sync="revealed" :class="{ 'error': addFileErr }">
                <text-input label="Year" type="text" v-model="filename"></text-input>
                <btn v-context="'primary'" @click.native="addYear()">
                    <icon name="fe-check" size="med" color="dark"></icon>
                </btn>
            </reveal>
            <icon slot="primary-icon" name="fe-plus-circle" size="large"></icon>
            Add a new year
        </card>
        <!-- <modal :open.sync="modalOpen">
            <p slot="header">New year details</p>
            <span v-if="addFileErr" class="error">There was a problem adding the new year. Please try again.</span>
            <text-input label="Year" type="text" v-model="filename" :placeholder="yearPlaceholder"></text-input>
            <btn v-context="'primary'" @click="addYear()">Add year</btn>
        </modal> -->
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'Home',
        data() {
            return {
                revealed: false,
                addFileErr: false,
                filename: '',
                fileRemoveReveals: [],
            };
        },
        methods: {
            showReveal() {
                this.revealed = true;
            },
            addYear() {
                this.addCsvFile(this.fileOptions);

                this.revealed = false;
            },
            stripFileExtension(filename) {
                return filename.substr(0, filename.lastIndexOf('.')) || filename;
            },
            viewFile(filename) {
                this.$store.dispatch('selectCsvFile', filename);
                this.$router.push(`/view/${filename}`);
            },
            ...mapActions([
                'getCsvFiles',
                'addCsvFile',
            ]),
        },
        computed: {
            fileOptions() {
                return {
                    filename: `${this.filename}.csv`,
                };
            },
            ...mapGetters([
                'csvFiles',
            ]),
        },
    };
</script>
