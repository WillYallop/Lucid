<template>
    <div class="textareaRow">
        <label v-if="label" :for="id">{{ label }}</label>
        <textarea class="textareaStyle" :name="name" :id="id" :aria-describedby="descriptionId" v-model="propModel"></textarea>
        <p v-if="description" :id="descriptionId" class="describe">{{ description }}</p>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        id: String,
        label: String,
        description: String,
        descriptionId: String,
        value: String
    },
    computed: {
        propModel: {
            get () { 
                return this.value 
            },
            set (value) { 
                this.$emit('updateProp', value) 
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.textareaRow {
    width: 100%;
    .textareaStyle {
        margin-top: 5px;
        resize: none;
        height: 150px;
        width: 100%;
        border: 1px solid $borderColour;
        border-radius: $borderRadius;
        color: map-get($map: $text, $key: _01-01);
        padding: 10px;
        font-size: 14px;
    }
}
</style>