<template>
  <div class="quillEditor" v-loading="loading">
  
    <!-- quill-editor插件标签 分别绑定各个事件-->
  
    <quill-editor 
    v-model="content" 
    ref="myQuillEditor" 
    :options="editorOption" 
    @change="onEditorChange($event)">
    </quill-editor>
  
    <!-- 文件上传input 将它隐藏-->
  
   <!-- action='http://120.79.116.245:19004/upload/quaAlias/' -->

    <el-upload 
    class="upload-demo" 
    action="http://pre-admin.biaodaa.com/upload/uploadImage/"
  
    :before-upload='beforeUpload' 
    :data="uploadData" 
    :on-success='upScuccess' 
    :on-error="handleAvatarFail" 
    :headers="headers" 
    ref="upload" 
    style="display:none">
  
      <el-button 
      size="small" 
      type="primary" 
      id="imgInput" 
      element-loading-text="插入中,请稍候">
      点击上传</el-button>
  
    </el-upload>
    <!-- <button @click="save">点击获取保存</button>  -->
    <button class="query-btn" @click="preview">预览</button>
    <el-button type="primary" @click="save" class="content-btn" >保存</el-button>
    <div class="box ql-editor" ref="htmlContainer"></div>   富文本预览效果  
  </div>
</template>

<script type="text/ecmascript-6">
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill";
// import store from "@/store";

export default {
  props: {
     matter:'',
    propId: ""
  },

  data() {
    return {
          loading: false, //图片上传状态来确定是否显示得 loading 动画 
          headers: {Authorization: localStorage.getItem('Authorization')}, 
          //图片上传得请求头得token值
          content: "", // 文章内容，这里可以输入要传进去得文章内容得
          editorOption: {
          placeholder: "请输入内容",
          modules: {
          // 配置富文本
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{header: 1}, {header: 2}],
            [{direction: "rtl"}],
            [{size: ["small", false, "large", "huge"]}],
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            [{color: []}, {background: []}],
            [{font: []}],
            [{align: []}],
            ["clean"],
            ["link", "image", "video"]
          ]
        }
      },
      addRange: [],
      uploadData: {
        file: ''
      },
      photoUrl: "", // 上传图片地址
      uploadType: "" // 上传的文件类型（图片、视频）
    };
  },
  computed: {
    // 上传七牛的actiond地址，http 和 https 不一样
    // qnLocation() {
    // return location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me'
    // }
  },
  created() {
  },
  methods: {
      preview () {
            if (!this.content || this.content === '') {
                this.$message.warning('内容为空，无预览效果！');
                return;
            }
            // var reg=new RegExp('(?=[^>]*(?=<))\s','g');
            console.log(this.content.replace(/(?=[^>]*(?=<))\s/g, '&nbsp;'));
            // this.dialogVisible = true;
            // 防止html容器还没渲染完成
            setTimeout(() => {
                console.log(this.$refs.htmlContainer);
                this.$refs.htmlContainer.innerHTML = this.content.replace(/(?=[^>]*(?=<))\s/g, '&nbsp;');
            }, 100);
            // this.$refs.htmlContainer.innerHTML = this.content.replace(/(?=[^>]*(?=<))\s/g, '&nbsp;');
        // this.$refs.htmlContainer.innerHTML = this.$refs.myQuillEditor.getContent();
        },
    save () {
      var reg=new RegExp("(?=[^>]*(?=<))\s","g");
      console.log(this.content.replace(/(?=[^>]*(?=<))\s/g, "&nbsp;"));
      // this.$refs.htmlContainer.innerHTML = this.$refs.myQuillEditor.getContent();
    },
    // 图片上传之前调取的函数

    // 这个钩子还支持 promise

    beforeUpload(file) {   //上传图片前操作
      console.log(file)
      console.log(file.name,133)
      this.uploadData.file = file.type 
      // return this.qnUpload(file);
    },

    // 图片上传前获得数据token数据

    qnUpload(file) {
      this.loading = true;

      // this.fullscreenLoading = true

      // const suffix = file.name.split('.')

      // const ext = suffix.splice(suffix.length - 1, 1)[0]

      // console.log(this.uploadType)

      // if (this.uploadType === 'image') { // 如果是点击插入图片

      // // TODO 图片格式/大小限制

      // alert('上传图片')

      // return this.$axios('common/get_qiniu_token').then(res => {

      // this.uploadData = {

      // key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,

      // token: res.data

      // }

      // })

      // } else if (this.uploadType === 'video') { // 如果是点击插入视频

      // return this.$axios('common/get_qiniu_token').then(res => {

      // this.uploadData = {

      // key: `video/${suffix.join('.')}_${new Date().getTime()}.${ext}`,

      // token: res

      // }

      // })

      // }
    },

    // 图片上传成功回调 插入到编辑器中

    upScuccess(e, file, fileList) {
      console.log(111)
      console.log(e)
      this.loading = false;

      // this.fullscreenLoading = false;

      let vm = this;

      let url = "";

      if (this.uploadType === "image") {
        // 获得文件上传后的URL地址
        url = e.data;
        console.log(e);
        console.log(url,);
      } else if (this.uploadType === "video") {
        url = vm.url + e.message;
      }

      if (url != null && url.length > 0) {
        // 将文件上传后的URL地址插入到编辑器文本中

        let value = url;

        // API: https://segmentfault.com/q/1010000008951906

        // this.$refs.myTextEditor.quillEditor.getSelection();

        // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。

        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection();

        value = value.indexOf("http") !== -1 ? value : "http:" + value;

        vm.$refs.myQuillEditor.quill.insertEmbed(
          vm.addRange !== null ? vm.addRange.index : 0,
          vm.uploadType,
          value,
          Quill.sources.USER
        ); // 调用编辑器的 insertEmbed 方法，插入URL
      } else {
        this.$message.error(`${vm.uploadType}插入失败`);
      }

      this.$refs["upload"].clearFiles(); // 插入成功后清除input的内容
    },

    // 点击图片ICON触发事件

    imgHandler(state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();

      if (state) {
        let fileInput = document.getElementById("imgInput");

        fileInput.click(); // 加一个触发事件
      }

      this.uploadType = "image";
    },

    // 获取html

    onEditorChange({  //内容发生改变得事件  
      editor,

      html,

      text
    }) {
      this.$emit("transferuser", html);
      // 转换空格
      // this.$refs.htmlContainer.innerHTML = html.replace(/(?=[^>]*(?=<))\s/g, "&nbsp;");
      //上面 这一行 代码给注释
    },

    // 点击视频ICON触发事件

    videoHandler(state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();

      if (state) {
        let fileInput = document.getElementById("imgInput");

        fileInput.click(); // 加一个触发事件
      }

      this.uploadType = "video";
    },

    test() {
      console.log("test触发了");

      // this.content = store.getters.quill_msg
    },

    editor(val) {
      this.content = val;
    },
    handleAvatarFail (err, file) {
      console.log(123);
      console.log(err);
      console.log(file)
    }
  },

  created() {
    this.content = this.matter;

    this.$refs = {
      myQuillEditor: HTMLInputElement,

      imgInput: HTMLInputElement
    };
  },

  // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件

  mounted() {
    this.$on("handleChange", function() {
      this.test();
    });

    this.$on("editormsg", function(val) {
      this.editor(val);
    });

    // this.content = store.getters.token

    // 为图片ICON绑定事件 getModule 为编辑器的内部属性

    // this.$refs.myQuillEditor.quill.editor.delta.ops = []

    console.log(this.$refs.myQuillEditor.quill);

    this.$refs.myQuillEditor.quill
      .getModule("toolbar")
      .addHandler("image", this.imgHandler);

    this.$refs.myQuillEditor.quill
      .getModule("toolbar")
      .addHandler("video", this.videoHandler); // 为视频ICON绑定事件
  },

  components: {
    quillEditor
  }
};
</script>
<style lang="less" >
 .quillEditor {
   text-align: right;
   .el-button {
     margin-top: 10px;
   }
 }
</style>

