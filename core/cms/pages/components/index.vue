<template>
<div>

    <!-- Notifications -->
    <LayoutNotificationSection>
        <!-- Has unregistered components -->
        <LayoutNotification v-if="componentNames.unregistered.length"
        :classname="'_04-01'"
        :error="false">
            <p>You have {{componentNames.unregistered.length}} unregistered component(s)!</p>
        </LayoutNotification>
        <!-- Has no components -->
        <LayoutNotification v-if="!hasComponents"
        :classname="'_04-01'"
        :error="false">
            <p>You currently have 0 components in your theme directory! Get started by adding some!</p>
        </LayoutNotification>
    </LayoutNotificationSection>


    <!-- Main Section -->
    <LayoutMainSection
    :title="'Components'"
    :body="'Mange and create new components for your pages.'">
        <!-- Action Button -->
        <template v-slot:actionButton>
            <button class="iconMain large">
                <img class="iconImg" src="@/assets/icons/plus-white.svg" alt="Add Component">
            </button>
        </template>
        <!-- Main -->
        <template v-slot:main>

            <!-- Content Container -->
            <div class="contentCon">
                <!-- Page Editor -->
                <div class="mainCol">

                    <!-- Has components in theme directory -->
                    <div v-if="hasComponents" class="">

                        {{ componentNames }}

                    </div>
                    <!-- No components in theme directory -->
                    <div v-else class="">
                        <h2>Your Theme Directory Has No Components</h2>
                    </div>

                </div>
                <!-- Page Config Sidebar -->
                <div class="sidebarCol">
                    <!-- Register Group -->
                    <div class="sidebarGroupCon">
                        <!-- Body -->
                        <div class="body">
                            <button class="iconButton" @click="registerNewComponentState = !registerNewComponentState">
                                <div class="iconMain small">
                                    <img class="iconImg" src="@/assets/icons/plus-white.svg" alt="Plus Icon">
                                </div>
                                <span>Register Component</span>
                            </button>
                        </div>
                    </div>
                    <!-- Layout Group -->
                    <div class="sidebarGroupCon">
                        <!-- Header -->
                        <div class="header">
                            <p class="mediumP">Layout</p>
                        </div>
                        <!-- Body -->
                        <div class="body">
                            <button class="mainBtnStyle active small left">Expanded</button>
                            <button class="mainBtnStyle small left">Compact</button>
                        </div>
                    </div>
                    <!-- Meta Group -->
                    <div class="sidebarGroupCon">
                        <!-- Header -->
                        <div class="header">
                            <p class="mediumP">Meta</p>
                        </div>
                        <!-- Body -->
                        <div class="body">
                            <ul class="infoListUl">
                                <li><span class="greyedOut">Registered:</span> {{ componentNames.registered.length }}</li>
                                <li><span class="greyedOut">Unregistered:</span> {{ componentNames.unregistered.length }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </template>
    </LayoutMainSection>

    <!-- Register Component Modal -->
    <GeneralModal
    :state="registerNewComponentState"
    @toggle="registerNewComponentState = !registerNewComponentState">
        <div class="registerModalCon">
            <div class="header">
                <h2>Register Component</h2>
                <p class="bodyText">Configure and register your new component.</p>
            </div>
            <div class="body">

                <!-- Component File Select -->
                <FormSelect style="margin-bottom: 10px"
                :name="'component select'"
                :id="'componentFileSelect'"
                :label="'Component File'"
                :description="'Select from the list of components that are yet to be registered.'"
                :descriptionId="'componentSelectInfo'"
                :value="registerNewComponentData.fileName"
                 @updateProp="registerNewComponentData.fileName = $event">
                    <option value="" selected disabled hidden>Choose component</option>
                    <option v-for="component in componentNames.unregistered" :key="component" :value="component">{{ component }}</option>
                </FormSelect>

                <!-- Name Field -->
                <FormInput style="margin-bottom: 10px"
                :name="'component name'"
                :id="'componentNameInp'"
                :label="'Name'"
                :value="registerNewComponentData.name"
                @updateProp="registerNewComponentData.name = $event"/>

                <!-- Description Field -->
                <FormTextarea
                :name="'component description'"
                :id="'componentDescInp'"
                :label="'Description / Summary'"
                :value="registerNewComponentData.description"
                @updateProp="registerNewComponentData.description = $event"/>

            </div>
            <div class="footer">
                <p>After registering a component you will be take to the component editor page. Here you will be able to configure its fields and more.</p>
                <button @click="registerComponent" class="mainBtnStyle active small" :disabled="loadingState">Register</button>
            </div>
        </div>
    </GeneralModal>

</div>
</template>

<script>
export default {
    async asyncData({ store }) {
        try {
            let componentsStateRes = await store.dispatch('cmth_getComponentsRegisterState');
            return {
                hasComponents: componentsStateRes.meta.has_components,
                componentNames: {
                    registered: componentsStateRes.data.registered,
                    unregistered: componentsStateRes.data.unregistered
                }
            }
        }
        catch(err) {
            throw new Error(err);
        }
    },
    data() {
        return {
            // Base
            hasComponents: false,
            componentNames: {
                registered: [],
                unregistered: []
            },
            // Register Component Data
            registerNewComponentState: false,
            registerNewComponentData: {
                fileName: '',
                name: '',
                description: ''
            }
        }
    },
    computed: {
        loadingState() {
            return this.$store.state.coreLoading.loadingState
        }
    },
    methods: {
        // Register a new componet
        async registerComponent() {
            // Verify name field
            // Verify description / summary field
            // Update this to validator module.
            if(this.registerNewComponentData.name.length && this.registerNewComponentData.description.length && this.registerNewComponentData.fileName.length) {
                // Save 
                this.$store.dispatch('cmth_registerComponent', {
                    name: this.registerNewComponentData.name,
                    description: this.registerNewComponentData.description,
                    file_name: this.registerNewComponentData.fileName
                })
                .then((res) => {
                    this.componentNames.unregistered = res.data;
                })
                .catch((err) => {

                })
            }
        }
    },
    watch: {
        registerNewComponentState(val) {
            if(val) {
                this.$store.dispatch('cmth_getUnregisteredComponents')
                .then((res) => {
                    this.componentNames.unregistered = res.data;
                })
                .catch((err) => {})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// Main Content
.contentCon {
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: auto;
    margin-top: 20px;
    .mainCol {
        width: calc(100% - 320px);
        height: 1000px;
    } 
    .sidebarCol {
        min-width: 300px;
        // Group
        .sidebarGroupCon {
            border: $border;
            border-radius: $borderRadius;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
            .header {
                padding: 10px 10px 10px;
                border-bottom: 1px solid $borderColour;
                .mediumP {
                    font-size: 14px;
                }
            }
            .body {
                padding: 10px;
            }
        }
    }
} 

// Register Modal
.registerModalCon {
    width: 100%;
    padding: $padding;
    .header {
        width: 100%;
        border-bottom: $border;
        padding-bottom: 15px;
        margin-bottom: 15px;
        h2 {
            margin-bottom: 5px;
        }
    }
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: $border;
        margin-top: 15px;
        padding-top: 15px;
        @media only screen and (max-width: 600px) {
            flex-wrap: wrap;
        }
        p {
            width: 100%;
            font-size: 14px;
            padding-right: 20px;
            max-width: 500px;
        }
        .mainBtnStyle {
            width: auto;
            @media only screen and (max-width: 600px) {
                width: 100%;
                margin-top: 10px;
            }
        }
    }
}
</style>