<template>
    <input type="text" v-model="propModel" :placeholder="placeholder" class="inputStyle">
</template>

<script>
export default {
    props: {
        value: String,
        placeholder: String
    },
    computed: {
        propModel: {
            get () { 
                return this.value 
            },
            set (value) { 
                this.$emit('updateProp', value) 
            },
        },
    },
}
</script>

<style lang="scss" scoped>
.inputStyle {
    height: 40px;
    width: 100%;
    border: 1px solid $borderColour;
    border-radius: $borderRadius;
    color: map-get($map: $text, $key: _01-01);
    padding: 0 10px;
    font-size: 16px;
    &::placeholder {
        color: map-get($map: $text, $key: _01-03);
    }
}
</style>