<template>
    <div class="home_banner">
        <div class="title">
            <h2>主页内容</h2>
        </div>
        <div class="banner ui-lazyLoad-pic">
            <div class="wrapper">
                <swiper :options="swiperOption" class="swiper-container">
                    <!-- slides -->
                    <swiper-slide class="swiper-item" v-for="item of bannerList" :key="item.aim_id">
                        <img
                            class="swiper-img"
                            :src="globalConfig.imagePath + item.url"
                            alt="banner"
                            @click="pageAction(item)"
                        />
                    </swiper-slide>
                    <!-- Optional controls ,显示小点-->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
let vm = null;
export default {
    data() {
        return {
            swiperOption: {
                // 参数选项,显示小点
                pagination: ".swiper-pagination",
                //循环
                loop: true,
                //每张播放时长3秒，自动播放
                autoplay: 2000,
                //滑动速度
                speed: 1000
                // delay:1000
            }
        };
    },
    props: {
        bannerList: {
            type: Array,
            default: []
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    methods: {
        handleClickSlide(index) {
            console.log("当前点击索引：", index);
        },
        pageAction({ type, aim_id, name }) {
            if (type === "PROJECT") {
                const params = {
                    taskId: "0",
                    projectId: aim_id,
                    from: "2",
                    name
                };
                this.$router.push({
                    name: "panoEditor",
                    params
                });
                this.$store.commit("SETHISTROY", {
                    path: `0/${aim_id}/1`,
                    params
                });
            } else {
                this.$router.push({
                    name: "newsDetail",
                    params: {
                        id: aim_id
                    }
                });
            }
        },
        toggleIndex(val) {
            this.index = val;
        }
    },
    created() {
        vm = this;
    }
};
</script>

<style lang="less">
.home_banner {
    width: 363px;
    background: #fff;
    .title {
        padding-left: 16px;
        padding-top: 14px;
        padding-bottom: 14px;
        h2 {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: rgba(0, 0, 0, 1);
            line-height: 24px;
            -webkit-background-clip: text;
        }
    }
    .banner {
        width: 363px;
        height: 206px;
        // background: url("./images/banner.png") no-repeat;
        background-size: 100%;
        .wrapper {
            height: 100%;
            .swiper-container {
                height: 100%;
                .swiper-img {
                    height: 100%;
                }
            }
        }
    }
}
</style>
