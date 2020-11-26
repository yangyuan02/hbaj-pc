<template>
    <el-dialog
        title="添加动作"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="600px"
        append-to-body
    >
        <main class="SelectAction" v-loading="loading">
            <SelectActionComp
                placeholder="图片描述"
                title="人物或动画形象选择"
                :list="guideHotspotImage"
                :onSelect="url => onSelect('img1', url, item)"
                :activeIndex="actionImg1Index"
            ></SelectActionComp>
            <SelectActionComp
                placeholder="动作描述"
                title="动作"
                :list="actionList"
                :onSelect="url => onSelect('img2', url)"
                :activeIndex="actionImg2Index"
            ></SelectActionComp>
        </main>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import SelectActionComp from "@/components/SelectAction";
import { hotspotContent, appConst } from "@/model/api";

import none from "../../images/action/01_none.png";
import upaction from "../../images/action/02_upaction.png";
import downaction from "../../images/action/03_downaction.png";
import leftaction from "../../images/action/04_leftaction.png";
import rightaction from "../../images/action/05_rightaction.png";
import narrowaction from "../../images/action/06_narrowaction.png";
import enlargeaction from "../../images/action/07_enlargeaction.png";
import jumpaction from "../../images/action/08_jumpaction.png";
import rotateaction from "../../images/action/09_rotateaction.png";
import swingaction from "../../images/action/10_swingaction.png";
import flashaction from "../../images/action/11_flashaction.png";
import yrotateaction from "../../images/action/12_yrotateaction.png";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onConfirm: {
            type: Function,
            default: () => {}
        },
        id: {
            type: [String, Number],
            default: ""
        },
        editData: {
            type: Object,
            default: {}
        }
    },
    components: {
        SelectActionComp
    },
    computed: {
        actionImg1Index: function() {
            return this.guideHotspotImage.findIndex(item => item.src === this.params.extra);
        },
        actionImg2Index: function() {
            return this.actionList.findIndex(item => item.desc === this.params.content);
        }
    },
    data() {
        return {
            guideHotspotImage: [],
            loading: false,
            checkedData: {},
            actionList: [
                { src: none, desc: "none" },
                { src: upaction, desc: "upaction" },
                { src: downaction, desc: "downaction" },
                { src: leftaction, desc: "leftaction" },
                { src: rightaction, desc: "rightaction" },
                { src: narrowaction, desc: "narrowaction" },
                { src: enlargeaction, desc: "enlargeaction" },
                { src: jumpaction, desc: "jumpaction" },
                { src: rotateaction, desc: "rotateaction" },
                { src: swingaction, desc: "swingaction" },
                { src: flashaction, desc: "flashaction" },
                { src: yrotateaction, desc: "yrotateaction" }
            ],
            params: {
                // 参数
                content: "", // 内容
                extra: "", // 附件url
                hotspotId: 0, // 附件id
                // id: 0,
                // seq: 0, // 排序
                title: "", // 标题
                type: "IMAGE" // 类型
            }
        };
    },
    watch: {
        id(newVal) {
            this.params.hotspotId = newVal;
        },
        editData(newVal) {
            this.$nextTick(() => {
                this.params = { ...newVal };
            });
        }
    },
    methods: {
        open() {
            this.getActionList();
        },
        close() {
            this.$emit("update:visible", false);
        },
        save() {
            this.close();
            this.onConfirm && this.onConfirm(this.checkedData);
            this.editImages();
        },
        getActionList() {
            const modules = this.$route.params.modules === "技术解读";
            if (modules) {
                this.getActionListZYYY();
            } else {
                this.getActionListJSJD();
            }
        },
        // 获取技术截图图片list
        getActionListJSJD() {
            this.loading = true;
            this.guideHotspotImage = [];
            appConst({
                type: "get",
                data: {
                    name: "PROJECT_GUIDE_HOTSPOT_ROLE"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    this.guideHotspotImage = (res.data || []).map(item => ({
                        src: item.value,
                        desc: ""
                    }));
                }
            });
        },
        // 获取专业英语图片list
        getActionListZYYY() {
            this.loading = true;
            this.guideHotspotImage = [];
            appConst({
                type: "get",
                data: {
                    name: "PROJECT_GUIDE_HOTSPOT_IMAGE"
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    this.guideHotspotImage = (res.data || []).map(item => ({
                        src: item.value,
                        desc: ""
                    }));
                }
            });
        },
        onSelect(type, url, item) {
            console.log(url);
            this.checkedData[type] = url;
        },
        editImages() {
            // 修改文本
            this.params.extra = this.checkedData.img1;
            this.params.content = this.checkedData.img2;
            hotspotContent(
                {
                    type: "post",
                    data: this.params
                },
                this.params.id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.close();
                    this.onSuccess && this.onSuccess();
                }
            });
        }
    }
};
</script>

<style lang="less">
.SelectAction {
    display: flex;
    justify-content: space-between;
}
</style>
