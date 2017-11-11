<style scoped lang="scss">
    @import "../components/sorbet/scss/index";

    .year-container {
        padding-top: 75px;
        padding-top: 6.5vmin;
    }

    .navigation {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
        color: $elementBg;

        & > * {
            margin-left: 1vmin;
        }

        .icon {
            cursor: pointer;

            &::before {
                transform: translateX(0);

                transition: $defaultTransitionProps;
            }

            &:hover::before {
                transform: translateX(-1vmin);

                transition: $defaultTransitionProps;
            }
        }
    }

    .input-container {
        width: 25%;
    }
</style>

<template>
    <div class="year-container">
        <navbar>
            <div class="navigation" slot="left">
                <icon name="fe-arrow-left" size="lg" color="light" @click.native="goBack()"></icon>
                <p>{{ stripFileExtension(this.selectedCsvFile) }}</p>
            </div>
        </navbar>
        <card class="add-card">
            <text-input type="text" label="First Name" :value="firstName"></text-input>
            <text-input type="text" label="Last Name" :value="lastName"></text-input>
            <!-- <checkbox></checkbox> -->
            <btn class="primary">
                <icon name="fe-plus" size="med" color="light"></icon>
                Add
            </btn>
        </card>
        <card class="centered">
            <p v-if="Object.keys(rows).length === 0">
                Looks like there's nothing here yet...
            </p>
            <grid v-else :rows="rows" :columns="columns">
            </grid>
        </card>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                firstName: '',
                lastName: '',
                paid: false,
            };
        },
        computed: {
            ...mapGetters([
                'selectedCsvFile',
                'columns',
                'rows',
            ]),
        },
        methods: {
            goBack() {
                if(this.$router.history.length === 0) {
                    this.$router.replace('/');
                }
                this.$router.back();
            },
            stripFileExtension(filename) {
                return filename.substr(0, filename.lastIndexOf('.')) || filename;
            },
            ...mapActions([
                'addRow',
                'updateRow',
                'removeRow',
            ]),
        },
    };
</script>
