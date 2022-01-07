<template>
    <nav class="navCon">
        <div class="navInner">
            <ul>
                <!-- Dashboard / general -->
                <div class="navLinkSect">
                    <li>
                        <router-link to="/">
                            <div class="icon"></div>
                            Dashboard
                        </router-link>
                    </li>
                </div>
                <!-- Pages / Posts -->
                <div class="navLinkSect">
                    <li>
                        <router-link to="/pages">
                            <div class="icon"></div>
                            Pages
                        </router-link>
                    </li>

                    <li v-for="post in posts" :key="post">
                        <router-link :to="{ name: 'post-post_name', params: { post_name: post.toLowerCase() }}">
                            <div class="icon"></div>
                            {{ post }}
                        </router-link>
                    </li>

                    <li>
                        <button class="btnStyle1">Add New Post Type</button>
                    </li>

                </div>
                <!-- Media -->
                <div class="navLinkSect">
                    <li>
                        <router-link to="/media">
                            <div class="icon"></div>
                            Media
                        </router-link>
                    </li>
                </div>
                <!-- Theme / Settings -->
                <div class="navLinkSect">
                    <li>
                        <router-link to="/components">
                            <div class="icon"></div>
                            Components
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/style">
                            <div class="icon"></div>
                            Style
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/settings">
                            <div class="icon"></div>
                            Settings
                        </router-link>
                    </li>
                </div>
            </ul>
        </div>
    </nav>
</template>


<script>
export default {
    data() {
        return {
            posts: []
        }
    },

}
</script>

<style lang="scss" scoped>
.navCon {
    width: 250px;
    position: fixed;
    top: $header-height;
    left: 0;
    bottom: 0;
    background-color: map-get($map: $colours, $key: _05-01);
    border-right: $border;
    .navInner {
        padding: $padding;
        ul {
            .navLinkSect {
                border-bottom: $border;
                padding: 5px 0;
                li {
                    padding: 5px 0;
                    a { 
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                        .icon {
                            width: 25px;
                            height: 25px;
                            background-color: map-get($map: $colours, $key: _07-01);
                            border-radius: 5px;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>