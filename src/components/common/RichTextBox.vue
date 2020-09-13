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
                this.upload();
                this.editor.customConfig.debug = true;
                this.editor.create(); // 创建富文本
            });
        },
        upload() {
            this.editor.customConfig.uploadImgHooks = {
                before: function(xhr, editor, files) {
                    // 图片上传之前触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                    // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                    // return {
                    //     prevent: true,
                    //     msg: '放弃上传'
                    // }
                },
                success: function(xhr, editor, result) {
                    console.log(result, "result,success");
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                fail: function(xhr, editor, result) {
                    console.log(result, "result,fail");
                    // 图片上传并返回结果，但图片插入错误时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                error: function(xhr, editor) {
                    console.log(xhr, "result,error");
                    // 图片上传出错时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
                timeout: function(xhr, editor) {
                    // 图片上传超时时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },

                // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert: function(insertImg, result, editor) {
                    console.log(process.env, "result");
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    var url = globalConfig.imagePath + result.data.path;

                    insertImg(url);

                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            };
        },
        editorConfig() {
            // 富文本配置
            const projectId = this.$route.params.projectId;
            this.editor.customConfig.uploadImgShowBase64 = false; // 上传图片base64
            this.editor.customConfig.uploadImgServer = `/api/file/upload?fileName=default&relatedId=${projectId}&fileType=HOTSPOT_HTML`;
            this.editor.customConfig.uploadFileName = "file";

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

<style lang="less">
#editor {
    .w-e-text-container {
        height: 400px !important;
    }
}
</style>
