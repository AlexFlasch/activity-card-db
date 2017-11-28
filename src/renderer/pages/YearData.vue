<style lang="scss">
    @import "../components/sorbet/scss/index";

    $pageTopPadding: 7vh;

    .year-container {
        padding-top: 75px;
        padding-top: $pageTopPadding;
        max-height: 100vh - $pageTopPadding;
        overflow: hidden;
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

    .card-container.add-card > .card-content {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .card-holders {
        max-height: 74vh;
        overflow-y: scroll;
    }

    .input-container {
        width: 25%;
    }

    .paid-checkbox {
        display: inline-flex;
        align-items: center;
    }

    iframe {
        position: absolute;
        top: 115%;

        width: 100vw;
        height: 100vh;

        body {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 100%;
            height: 100%;
        }

        svg {
            width: 100%;
        }

        @media print {
            body {
                width: 100%;
                height: 100%;

                margin: 0;
            }
        }
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
            <text-input type="text" label="First Name" v-model="firstName"></text-input>
            <text-input type="text" label="Last Name" v-model="lastName"></text-input>
            <div class="paid-checkbox">
                <label>Paid:</label>
                <checkbox v-model="paid"></checkbox>
            </div>
            <btn class="primary" @click.native="addGridRow">
                <icon name="fe-plus" size="med" color="light"></icon>
                Add
            </btn>
        </card>
        <card class="centered card-holders">
            <p v-if="Object.keys(rows).length === 0">
                Looks like there's nothing here yet...
            </p>
            <grid v-else :rows="rows" :columns="columns" :scope="this">
                <div slot="number" slot-scope="{ val }">
                    {{ val }}
                </div>
                <div slot="string" slot-scope="{ val }">
                    {{ val }}
                </div>
                <div slot="boolean" slot-scope="{ val }">
                    <icon v-if="val" name="fe-check-circle" size="med" color="success"></icon>
                    <icon v-else name="fe-x-circle" size="med" color="error"></icon>
                </div>
            </grid>
        </card>
        <iframe id="activity-card" :src="ActivityCardSvg" frameborder="0"></iframe>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import ActivityCardSvg from '~/static/activity-card-template.svg';

    export default {
        data() {
            return {
                ActivityCardSvg,
                firstName: '',
                lastName: '',
                paid: false,
                selectedName: '',
            };
        },
        computed: {
            columns() {
                const columns = this.$store.getters.columns;

                columns.push({
                    title: 'print',
                    type: Function,
                    click: this.printActivityCard,
                });

                return columns;
            },
            ...mapGetters([
                'selectedCsvFile',
                'rows',
            ]),
        },
        methods: {
            goBack() {
                this.deselectCsvFile();

                if(this.$router.history.length === 0) {
                    this.$router.replace('/');
                } else {
                    this.$router.back();
                }
            },
            stripFileExtension(filename) {
                return filename.substr(0, filename.lastIndexOf('.')) || filename;
            },
            addGridRow() {
                this.addRow({ firstName: this.firstName, lastName: this.lastName, paid: this.paid });

                // clear add form
                this.firstName = '';
                this.lastName = '';
                this.paid = false;
            },
            padCardNumber(number) {
                const str = `${number}`;
                const pad = '#00000';

                return `${pad.substr(0, pad.length - str.length)}${str}`;
            },
            printActivityCard(row, rowIndex) {
                this.selectedName = `${row.firstName} ${row.lastName}`;

                const activityCardWin = document.querySelector('#activity-card').contentWindow;
                const activityCardDoc = document.querySelector('#activity-card').contentDocument;

                // get references to activity card text
                const cardholderName = activityCardDoc.getElementById('cardholder.-name');
                const cardYear = activityCardDoc.getElementById('card.-year');
                const cardNumber = activityCardDoc.getElementById('id.-number');

                // kinda ugly hardcoded way to set the SVG text to our own data
                cardholderName.childNodes[0].data = this.selectedName;
                cardYear.childNodes[1].innerHTML = this.stripFileExtension(this.selectedCsvFile);
                cardNumber.childNodes[1].innerHTML = this.padCardNumber(rowIndex + 1);

                activityCardWin.focus();
                activityCardWin.print();

                // shows what the svg looks like by replacing page contents
                // debugger;
                // document.write(
                //     new XMLSerializer().serializeToString(activityCardDoc.documentElement));
            },
            ...mapActions([
                'addRow',
                'updateRow',
                'removeRow',
                'deselectCsvFile',
            ]),
        },
    };
</script>
