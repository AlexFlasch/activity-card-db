<style scoped lang="scss">
    @import "../scss/components/sorbet-grid";
</style>

<template>
    <div class="grid-container">
        <div class="grid-header">
            <div class="grid-column-title" v-for="column in columns">
                {{ column.title }}
            </div>
        </div>
        <div class="grid-body">
            <div class="grid-row" v-for="row in rows">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'grid',
        props: {
            columns: {
                type: [Array, String],
                required: true,
                validator(val) {
                    if(typeof val === 'string') {
                        val = JSON.parse(val);
                    }

                    let validColumns = true;

                    val.forEach((col) => {
                        // find required properties of column obj
                        if(col.title === undefined) {
                            validColumns = false;
                        }
                        if(col.type === undefined) {
                            validColumns = false;
                        }
                    });

                    return validColumns;
                },
            },
            rows: {
                type: [Array, String],
                required: false,
                default: [],
                validator(val) {
                    // no validation check for arrays, since that
                    // is dependent upon the columns prop
                    // row validation is done on the created hook
                    if(typeof val === 'string') {
                        // just make sure any strings are valid JSON
                        // otherwise the user will get a SyntaxError
                        val = JSON.parse(val);
                    }

                    return true;
                },
            },
        },
        created() {
            let columns = this.columns;
            let rows = this.rows;

            if(typeof columns === 'string') {
                columns = JSON.parse(columns);
            }
            if(typeof rows === 'string') {
                rows = JSON.parse(rows);
            }

            // validate the rows by the columns that were supplied
            let invalidRows = false;

            rows.forEach((row) => {
                row.forEach((val, i) => {
                    if(typeof row[val] !== typeof Object.values(columns)[i]) {
                        invalidRows = true;
                    }
                });
            });

            if(invalidRows) {
                /* eslint-disable no-console */
                console.warn(`Sorbet grid's rows array did not match the supplied columns array.\n
                    Make sure that the order in which you define the columns matches the order the
                    values are specified in the rows array`);
                /* eslint-enable no-console */
            }
        },
    };
</script>
