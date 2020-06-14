<template>
    <div class="bg_nav">
        <Nav></Nav>
    </div>
</template>

<script>
import Nav from "@/components/common/Nav";
export default {
    data() {
        return {};
    },
    components: {
        Nav
    }
};
</script>

<style lang="less">
.bg_nav {
    width: 749px;
    height: 959px;
    background: url("./images/nav.png") no-repeat;
    background-size: 100%;
}
</style>
