<template>
    <section class="notificationSect">
        <slot></slot>
    </section>
</template>

<style lang="scss" scoped>
// Notification Bar
.notificationSect {
    width: 100%;
    .notificationBar {
        &:last-child {
            margin-bottom: 20px;
        }
    }
}
</style>