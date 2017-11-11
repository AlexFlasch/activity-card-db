<style scoped lang="scss">
    @import "../scss/components/sorbet-grid";
</style>

<template>
    <table class="grid-container">
        <thead class="grid-header">
            <th class="grid-column-title" v-for="(column, colIndex) in columns" :key="colIndex">
                {{ column.title || column }}
            </th>
        </thead>
        <tbody class="grid-body" v-if="this.rows.length > 0">
            <tr class="grid-row" v-for="(row, rowIndex) in rows" :key="rowIndex">
                <td class="grid-cell" v-for="(value, valueIndex) in getRowValues(row)" :key="valueIndex">
                    <div slot-scope="number" v-if="typeof value === 'number'" :val="value">
                        {{ value }}
                    </div>
                    <div slot-scope="string" v-if="typeof value === 'string'" :val="value">
                        {{ value }}
                    </div>
                    <div slot-scope="boolean" v-if="typeof value === 'boolean'" :val="value">
                        <span v-if="value === true">
                            ✔
                        </span>
                        <span v-else>
                            ✗
                        </span>
                    </div>
                    <div v-else><!-- The value was a Symbol, null, or undefined --></div>
                </td>
            </tr>
        </tbody>
    </table>
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

                    if(!Array.isArray(val)) {
                        validColumns = false;
                    }

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
        methods: {
            getRowValues(row) {
                if(!row) {
                    return {};
                }

                return Object.values(row).map((val) => {
                    if(val === 'true' || val === 'false') {
                        // convert boolean string to boolean primitive
                        val = !!val;
                    } else if(!isNaN(val)) {
                        // convert valid number string to number primitive
                        val = +val;
                    }

                    return val;
                });
            },
        },
    };
</script>
