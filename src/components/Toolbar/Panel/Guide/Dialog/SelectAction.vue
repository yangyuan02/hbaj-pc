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
            <SelectAction
                placeholder="图片描述"
                title="人物或动画形象选择"
                :list="guideHotspotImage"
                :onSelect="url => onSelect('img1', url, item)"
            ></SelectAction>
            <SelectAction
                placeholder="动作描述"
                title="动作"
                :list="actionList"
                :onSelect="url => onSelect('img2', url)"
            ></SelectAction>
        </main>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import SelectAction from "@/components/SelectAction";
import { home, hotspotContent } from "@/model/api";

import flashaction from "../../images/action/flashaction.png";
import jumpaction from "../../images/action/jumpaction.png";
import leftaction from "../../images/action/flashaction.png";
import narrowaction from "../../images/action/flashaction.png";
import none from "../../images/action/flashaction.png";
import rightaction from "../../images/action/flashaction.png";
import rotateaction from "../../images/action/flashaction.png";
import swingaction from "../../images/action/flashaction.png";
import upaction from "../../images/action/flashaction.png";
import yrotateaction from "../../images/action/flashaction.png";

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
        SelectAction
    },
    data() {
        return {
            guideHotspotImage: [],
            loading: false,
            checkedData: {},
            actionList: [
                flashaction,
                jumpaction,
                leftaction,
                narrowaction,
                none,
                rightaction,
                rotateaction,
                swingaction,
                upaction,
                yrotateaction
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
            this.loading = true;
            home({ type: "get" }, "/pageInfo").then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    this.guideHotspotImage = res.data.guideHotspotImage || [];
                }
                console.log(res);
            });
        },
        onSelect(type, url, item) {
            this.checkedData[type] = url;
        },
        editImages() {
            // 修改文本
            this.params.extra = this.checkedData.img1;
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
