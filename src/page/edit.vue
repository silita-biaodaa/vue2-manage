<template>
  <div class="quillEditor" v-loading="loading">
    <quill-editor 
    v-model="content" 
    ref="myQuillEditor" 
    :options="editorOption" 
    @change="onEditorChange($event)">
    </quill-editor>

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
    <el-button type="primary" @click="save" class="content-btn" >保存</el-button> 
  </div>
</template>

<script type="text/ecmascript-6">
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill";

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
  },
  created() {
  },
  methods: {
      preview () {
            if (!this.content || this.content === '') {
                this.$message.warning('内容为空，无预览效果！');
                return;
            }
            setTimeout(() => {
                console.log(this.$refs.htmlContainer);
                this.$refs.htmlContainer.innerHTML = this.content.replace(/(?=[^>]*(?=<))\s/g, '&nbsp;');
            }, 100);
        },
    save () {
      var reg=new RegExp("(?=[^>]*(?=<))\s","g");
    },

    beforeUpload(file) {   //上传图片前操作
      this.uploadData.file = file.type 
    },

    qnUpload(file) {
      this.loading = true;
    },
    upScuccess(e, file, fileList) {
      console.log(111)
      console.log(e)
      this.loading = false;
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

        let value = url;
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

    imgHandler(state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();

      if (state) {
        let fileInput = document.getElementById("imgInput");

        fileInput.click(); // 加一个触发事件
      }

      this.uploadType = "image";
    },

    onEditorChange({  //内容发生改变得事件  
      editor,

      html,

      text
    }) {
      this.$emit("transferuser", html);
    },

    videoHandler(state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();

      if (state) {
        let fileInput = document.getElementById("imgInput");

        fileInput.click(); // 加一个触发事件
      }

      this.uploadType = "video";
    },

    editor(val) {
      this.content = val;
    },
    handleAvatarFail (err, file) {

    }
  },

  created() {
     setInterval(() => {
      this.content = this.matter;
    }, 100);
  

    this.$refs = {
      myQuillEditor: HTMLInputElement,

      imgInput: HTMLInputElement
    };
  },

  mounted() {
   
    
    this.$on("handleChange", function() {
      this.test();
    });

    this.$on("editormsg", function(val) {
      this.editor(val);
    });

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

