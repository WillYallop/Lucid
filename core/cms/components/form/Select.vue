<template>
    <div class="selectRow">
        <label v-if="label" :for="id">{{ label }}</label>
            <select class="selectStyle" v-model="propModel" :name="name" :id="id" :aria-describedby="descriptionId">
                <slot></slot>
            </select>
            

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
            },
        },
    },
}
</script>

<style lang="scss" scoped>
.selectRow {
    width: 100%;
        
    .selectStyle {
        height: 40px;
        width: 100%;
        margin-top: 5px;
        border: 1px solid $borderColour;
        border-radius: $borderRadius;
        color: map-get($map: $text, $key: _01-01);
        padding: 0 10px;
        font-size: 14px;
        -webkit-appearance: none;
        &::-ms-expand {
            display: none;
        }

        background-image:
            linear-gradient(45deg, transparent 50%, white 50%),
            linear-gradient(135deg, white 50%, transparent 50%),
            linear-gradient(to right, #141414, #141414);
        background-position:
            calc(100% - 20px) calc(15px + 2px),
            calc(100% - 15px) calc(15px + 2px),
            100%  0;
        background-size:
            5px 5px,
            5px 5px,
            40px 40px;
        background-repeat: no-repeat;

        &:focus {
            background-image:
                linear-gradient(45deg, white 50%, transparent 50%),
                linear-gradient(135deg, transparent 50%, white 50%),
                linear-gradient(to right, #2C2C2C, #2C2C2C);
            background-position:
                calc(100% - 15px) 16px,
                calc(100% - 20px) 16px,
                100% 0;
  
            background-repeat: no-repeat;
            outline: 0;
        }
    }
    .describe {
        margin-top: 5px;
        font-size: 14px;
    }
}
</style>