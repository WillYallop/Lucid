<template>
    <nav class="navCon">
        <div class="navInner">
            
            <ul>
                <!-- Dashboard / general -->
                <div class="navLinkSect">
                    <li>
                        <nuxt-link to="/">
                            <div class="iconMain _01-01">
                                <img class="iconImg" src="@/assets/icons/tachometer.svg" alt="Tacometer">
                            </div>
                            Dashboard
                        </nuxt-link>
                    </li>
                </div>
                <!-- Pages / Posts -->
                <div class="navLinkSect">
                    <li>
                        <nuxt-link to="/pages">
                            <div class="iconMain _02-01">
                                <img class="iconImg" src="@/assets/icons/page.svg" alt="Pages">
                            </div>
                            Pages
                        </nuxt-link>
                    </li>

                    <li v-for="post in posts" :key="post">
                        <nuxt-link :to="{ name: 'post-post_name', params: { post_name: post.toLowerCase() }}">
                            <div class="iconMain _02-01">
                                <img class="iconImg" src="@/assets/icons/page.svg" alt="Pages">
                            </div>
                            {{ post }}
                        </nuxt-link>
                    </li>

                </div>
                <!-- Media -->
                <div class="navLinkSect">
                    <li>
                        <nuxt-link to="/media">
                            <div class="iconMain _03-01">
                                <img class="iconImg" src="@/assets/icons/assets.svg" alt="Assets">
                            </div>
                            Media
                        </nuxt-link>
                    </li>
                </div>
                <!-- Theme / Settings -->
                <div class="navLinkSect">
                    <li>
                        <nuxt-link to="/components">
                            <div class="iconMain _04-01">
                                <img class="iconImg" src="@/assets/icons/style.svg" alt="Style">
                            </div>
                            Components
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/style">
                            <div class="iconMain _04-01">
                                <img class="iconImg" src="@/assets/icons/style.svg" alt="Style">
                            </div>
                            Style
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/settings">
                            <div class="iconMain _04-01">
                                <img class="iconImg" src="@/assets/icons/cog.svg" alt="Settings">
                            </div>
                            Settings
                        </nuxt-link>
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
    async fetch() {
        this.$axios.get('http://api.willpress.local/theme/posts')
        .then((response) => {
          response.data.posts.forEach(post => {
            this.posts.push(post.name)
          });
          response.data.failed.forEach(post => {
            console.error(post.error);
          });
        })
        .catch((err) => {
          console.log(err);
        })
    },
}
</script>

<style lang="scss" scoped>
.navCon {
    width: 300px;
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
                a {
                    @include animate;
                    padding: 5px 0;
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    color: map-get($map: $text, $key: _01-01);
                    opacity: 0.5;
                    text-transform: capitalize;
                    &.nuxt-link-exact-active {
                        opacity: 1;
                    }
                    .iconMain {
                        margin-right: 10px
                    }
                    &:hover {
                        opacity: 0.8;
                        &.nuxt-link-exact-active {
                            opacity: 1;
                        }
                        .iconMain {
                            &._01-01 {
                                background: map-get($map: $colours, $key: _01-02);
                            }
                            &._02-01 {
                                background: map-get($map: $colours, $key: _02-02);
                            }
                            &._03-01 {
                                background: map-get($map: $colours, $key: _03-02);
                            }
                             &._04-01 {
                                background: map-get($map: $colours, $key: _04-02);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>