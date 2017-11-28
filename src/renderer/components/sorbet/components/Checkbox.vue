<style lang="scss">
    @import "../scss/components/sorbet-checkbox";
</style>

<template>
    <div class="checkbox-container" :class="classes" tabindex="0" @keyup.space="toggleChecked()">
        <input type="checkbox" tabindex="-1" :checked="checked" @click="updateModel($event.target.checked)">
        <svg viewBox="0 0 100 100">
            <defs>
                <filter id="drop-shadow" width="100" height="100">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
                    <feOffset dx="0" dy="12" result="offsetblur"/>
                    <feFlood flood-color="rgba(0,0,0,0.3)"/>
                    <feComposite in2="offsetblur" operator="in"/>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <g class="svg-checkmark">
                <path d="M 15 55 L 35 75 L 85 25"
                    fill="none" stroke="white" stroke-width="7.5"
                    filter="url('#drop-shadow')"/>
            </g>
        </svg>
    </div>
</template>

<script>
export default {
    name: 'checkbox',
    model: {
        prop: 'checked',
        event: 'check',
    },
    props: {
        checked: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        classes() {
            return {
                checked: this.checked,
            };
        },
    },
    methods: {
        updateModel(modelVal) {
            this.$emit('check', modelVal);
        },
        toggleChecked() {
            this.$emit('check', !this.checked);
        },
    },
};
</script>
