<style lang="scss">
    @import "../scss/components/sorbet-grid";
</style>

<template>
    <table class="grid-container">
        <thead class="grid-header">
            <th class="grid-column-title" v-for="(column, colIndex) in columns" :key="colIndex">
                <span v-if="typeof column.type !== 'function'">
                    {{ column.title || column }}
                </span>
            </th>
        </thead>
        <tbody class="grid-body" v-if="rows.length > 0">
            <tr class="grid-row" v-for="(row, rowIndex) in rows" :key="rowIndex">
                <td class="grid-cell" v-for="(value, valueIndex) in getRowValues(row)" :key="valueIndex">
                    <slot name="number" v-if="typeof value === 'number'" :val="value">
                        {{ value }}
                    </slot>
                    <slot name="string" v-else-if="typeof value === 'string'" :val="value">
                        {{ value }}
                    </slot>
                    <slot name="boolean" v-else-if="typeof value === 'boolean'" :val="value">
                        <span v-if="value === true">
                            ✔
                        </span>
                        <span v-else>
                            ✗
                        </span>
                    </slot>
                    <slot name="function" v-else-if="typeof value === 'function'" :val="value">
                        <btn class="primary" @click.native="value(row, rowIndex)">
                            {{ capitalize(columns[valueIndex].title) }}
                        </btn>
                    </slot>
                    <div v-else><!-- The value was a Symbol, null, or undefined --></div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import Btn from '@/components/sorbet/components/Btn';

    export default {
        name: 'grid',
        components: {
            Btn,
        },
        props: {
            scope: {
                required: false,
            },
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
        data() {
            return {
                displayRows: [],
                displayColumns: [],
            };
        },
        created() {
            this.createTableButtons();
        },
        methods: {
            capitalize(word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            },
            getRowValues(row) {
                if(!row) {
                    return {};
                }

                return Object.values(row).map((val) => {
                    if(val === 'true' || val === 'false') {
                        // convert boolean string to boolean primitive
                        val = val === 'true';
                    } else if(!isNaN(val) && typeof val !== 'boolean' && typeof val !== 'function') {
                        // convert valid number string to number primitive
                        val = +val;
                    }

                    return val;
                });
            },
            createTableButtons() {
                this.columns.forEach((col) => {
                    if(typeof col.type === 'function') {
                        this.rows.map((row) => {
                            // bind parent scope to the click function so that
                            // the parent can define what happens in the click
                            // function relative to the parent's own scope.
                            col.click = col.click.bind(this.scope);

                            row[col.title] = col.click;
                            return row;
                        });
                    }
                });
            },
        },
        watch: {
            rows() {
                this.createTableButtons();
            },
        },
    };
</script>
