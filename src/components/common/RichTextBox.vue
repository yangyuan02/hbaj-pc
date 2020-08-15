<template>
    <div id="editor"></div>
</template>

<script>
import Editor from "wangeditor";
export default {
    data() {
        return {};
    },
    methods: {
        initEditor() {
            // 初始化富文本编辑器
            this.$nextTick(() => {
                this.editor = new Editor("#editor"); // 构造富文本实例
                this.editorConfig(); // 修改富文本配置
                this.editor.create(); // 创建富文本
            });
        },
        editorConfig() {
            // 富文本配置
            this.editor.customConfig.uploadImgShowBase64 = true; // 上传图片base64
            this.editor.customConfig.pasteIgnoreImg = true; // 过滤直接粘贴进来的图片
            this.editor.customConfig.pasteTextHandle = content => this.pasteTextHandle(content);
            /**
             * 数据库不能存储颜文字
             * 如果修改mySql配置，会存在风险，所以这里前端禁用颜文字
             */
            this.editor.customConfig.menus = [
                "head", // 标题
                "bold", // 粗体
                "fontSize", // 字号
                "fontName", // 字体
                "italic", // 斜体
                "underline", // 下划线
                "strikeThrough", // 删除线
                "foreColor", // 文字颜色
                "backColor", // 背景颜色
                "link", // 插入链接
                "list", // 列表
                "justify", // 对齐方式
                "quote", // 引用
                "image", // 插入图片
                "table", // 表格
                "video", // 插入视频
                "code", // 插入代码
                "undo", // 撤销
                "redo" // 重复
            ];
        },
        pasteTextHandle(text) {
            // 过滤一些没有的标签 以免富文本体积字符太长
            var html = text;
            html = html.replace(/<\/?SPANYES[^>]*>/gi, ""); //  Remove  all  SPAN  tags
            // html = html.replace(/<(\w[^>]*)  class=([^|>]*)([^>]*)/gi, "<$1$3");  //  Remove  Class  attributes
            // html = html.replace(/<(\w[^>]*)  style="([^"]*)"([^>]*)/gi, "<$1$3");  //  Remove  Style  attributes
            html = html.replace(/<(\w[^>]*) {2}lang=([^|>]*)([^>]*)/gi, "<$1$3"); //  Remove  Lang  attributes
            html = html.replace(/<\\?\?xml[^>]*>/gi, ""); //  Remove  XML  elements  and  declarations
            html = html.replace(/<\/?\w+:[^>]*>/gi, ""); //  Remove  Tags  with  XML  namespace  declarations:  <o:p></o:p>
            html = html.replace(/&nbsp;/, ""); //  Replace  the  &nbsp;
            html = html.replace(/\n(\n)*( )*(\n)*\n/gi, "\n");
            html = html.replace(/<xml>[\s\S]*?<\/xml>/gi, "");
            return html;
        },
        getHtml() {
            // 获取富文本html字符串
            return this.editor.txt.html();
        },
        setHtml(html) {
            this.editor.txt.html(html);
        }
    },
    mounted() {
        this.initEditor();
    },
    beforeDestroy() {
        this.editor && (this.editor = null);
    }
};
</script>

<style lang="less"></style>
