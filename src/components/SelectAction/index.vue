<template>
    <div class="select-content">
        <div class="select-header">
            <span>{{ title }}</span>
        </div>
        <div class="select-body">
            <div class="action_list">
                <ul>
                    <li
                        v-for="(item, index) in list"
                        :key="index"
                        @click="select(globalConfig.imagePath + item, index)"
                        class="ui-lazyLoad-pic"
                        :class="{ active: index === currentIndex }"
                        v-skeleton="globalConfig.imagePath + item"
                    >
                        <!-- <img :src="globalConfig.imagePath + item" alt="" /> -->
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        list: {
            type: Array,
            default: []
        },
        onSelect: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            currentIndex: null
        };
    },
    methods: {
        select(url, index) {
            this.currentIndex = index;
            this.onSelect && this.onSelect(url);
        }
    }
};
</script>

<style lang="less">
.select-content {
    width: 260px;
    .select-header {
        width: 100%;
        text-align: center;
        height: 20px;
    }
    .select-body {
        .action_list {
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li {
                    width: 48px;
                    height: 48px;
                    margin-right: 10px;
                    margin-bottom: 8px;
                    // background: rgba(221, 221, 221, 1);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    &.active {
                        border: 1px solid #ffa500;
                    }
                }
            }
        }
        .desc {
            width: 97%;
        }
    }
}
</style>
