<template>
    <div class="submenu">
        <div class="submenu_list">
            <ul>
                <li
                    v-for="(item, index) in shipList"
                    :key="index"
                    :class="[
                        $route.query.blockId.toString() === item.blockId.toString() ? 'active' : ''
                    ]"
                    @click="handShip(item)"
                >
                    <img :src="item.src" :alt="item.text" />
                    <div class="mask">
                        <span>{{ item.title }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="three_menu_list">
            <ul>
                <li
                    v-for="(item, index) in classList"
                    :key="index"
                    :class="[
                        $route.query.classListId.toString() === item.id.toString() ? 'active' : ''
                    ]"
                    @click="handClass(item)"
                    class="cursor"
                >
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import img1 from "./images/01.png";
import img2 from "./images/02.png";
import img3 from "./images/03.png";
import img4 from "./images/04.png";
export default {
    data() {
        return {
            list: [
                {
                    src: img1,
                    title: "豪华邮轮"
                },
                {
                    src: img2,
                    title: "散货船"
                },
                {
                    src: img3,
                    title: "普通干货船"
                },
                {
                    src: img4,
                    title: "集装箱船"
                }
            ],
            classList: [],
            shipList: []
        };
    },
    props: {
        modulesList: {
            type: Array,
            default: []
        },
        path: {
            type: String,
            default: ""
        }
    },
    computed: {
        emptyList: function() {
            return 5 - (this.classList.length % 5);
        }
    },
    watch: {
        $route: {
            handler() {
                this.getShipList();
                this.getClassList();
            },
            immediate: true
        }
    },
    methods: {
        getShipList() {
            const { name } = this.$route.query;
            this.shipList = [];
            const shipList = this.modulesList.filter(item => item.name === name);
            const list = (shipList[0]["children"] || []).map(item => ({
                ...item,
                ...this.list.find(k => k.title === item.blockName)
            }));
            this.shipList = list;
        },
        getClassList() {
            const { blockId } = this.$route.query;
            this.classList = [];
            this.classList = (this.shipList || []).find(
                item => item.blockId.toString() === blockId.toString()
            )["classList"];
        },
        handShip({ blockId, classList = [], id }) {
            const query = {
                ...this.$route.query,
                moduleId: id,
                blockId,
                classListId: (classList.length && classList[0].id) || ""
            };
            this.routerChange(query);
        },
        handClass(data) {
            const { id } = data;
            const query = {
                ...this.$route.query,
                classListId: id
            };
            this.routerChange(query);
        },
        routerChange(query) {
            this.$router.push({
                path: this.path,
                query
            });
        }
    }
};
</script>

<style lang="less">
.submenu {
    .submenu_list {
        max-width: 888px;
        ul {
            display: flex;
            justify-content: space-between;
            li {
                // width: 190px;
                height: 112px;
                max-width: 190px;
                position: relative;
                flex: 1;
                border-radius: 12px;
                &.active {
                    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
                    transform: scale(1.1);
                }
                img {
                    width: 100%;
                    height: 100%;
                }
                .mask {
                    position: absolute;
                    left: 19px;
                    top: 19px;
                    width: 77px;
                    height: 21px;
                    text-align: center;
                    line-height: 21px;
                    color: #fff;
                    border-radius: 10px;
                    background: rgba(0, 0, 0, 0.3);
                }
            }
        }
    }
    .three_menu_list {
        margin: 20px 0;
        ul {
            display: flex;
            li {
                margin-right: 25px;
                &.active {
                    span {
                        color: rgba(255, 157, 59, 1);
                    }
                }
                span {
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    color: rgba(102, 102, 102, 1);
                    line-height: 19px;
                }
            }
        }
    }
}
</style>
