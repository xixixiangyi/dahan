<template>
  <div>
    <div class="header"
         style="width:270px; margin-left: 200px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 80px;">脚本管理-脚本文件导入</div>
    </div>
    <div class="mainContent">
      <el-row :gutter="10">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-col :md="3"
                  :lg="8">
            <el-form-item label="产品名称:"
                          :label-width="formLabelWidth">
              <el-select v-model="formInline.user"
                         style="width: 100%"
                         @change="onChange">
                <el-option label="请选择"
                           value=""></el-option>
                <el-option label="1"
                           value="zhengchang"></el-option>
                <el-option label="2"
                           value="zanting"></el-option>
                <el-option label="3"
                           value="xiaohu"></el-option>

              </el-select>

            </el-form-item>

          </el-col>

          <el-col :md="3"
                  :lg="8">
            <el-form-item label="模块名称:"
                          :label-width="formLabelWidth">

              <el-select v-model="formInline.user"
                         style="width: 100%">
                <el-option label="请选择"
                           value=""></el-option>
                <el-option label="1"
                           value="zhengchang"></el-option>
                <el-option label="2"
                           value="zanting"></el-option>
                <el-option label="3"
                           value="xiaohu"></el-option>

              </el-select>

            </el-form-item>

          </el-col>

          <el-col :md="6"
                  :lg="10">
            <el-form-item label="测试依赖Excel文件:"
                          label-width="140px">
              <el-upload class="upload-demo"
                         ref="upload"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         multiple
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :before-remove="beforeRemove"
                         :file-list="fileList"
                         :auto-upload="false">
                <el-button slot="trigger"
                           style=""
                           size="small"
                           type="">选取文件</el-button>
                <el-button style="margin-top: 10px;"
                           size="small"
                           type=""
                           @click="submitUpload">上传文件</el-button>
                <div slot="tip"
                     class="el-upload__tip">只能上传python格式文件，文件不能超过500kb</div>
              </el-upload>
            </el-form-item>

          </el-col>

        </el-form>

      </el-row>
      <div id="listText"
           v-if="show">脚本列表</div>

      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline"
               style="text-align: left;">

        <el-form-item label="模块名称:"
                      :label-width="formLabelWidth">
          <el-select v-model="formInline.user"
                     style="width: 100%">
            <el-option label="请选择"
                       value=""></el-option>
            <el-option label="1"
                       value="zhengchang"></el-option>
            <el-option label="2"
                       value="zanting"></el-option>
            <el-option label="3"
                       value="xiaohu"></el-option>

          </el-select>

        </el-form-item>
        <el-form-item label="接口名称:"
                      :label-width="formLabelWidth">

          <el-select v-model="formInline.user"
                     style="width: 100%">
            <el-option label="请选择"
                       value=""></el-option>
            <el-option label="1"
                       value="zhengchang"></el-option>
            <el-option label="2"
                       value="zanting"></el-option>
            <el-option label="3"
                       value="xiaohu"></el-option>

          </el-select>

        </el-form-item>
        <el-form-item label="用例名称:"
                      :label-width="formLabelWidth">

          <el-select v-model="formInline.user"
                     style="width: 100%">
            <el-option label="请选择"
                       value=""></el-option>
            <el-option label="1"
                       value="zhengchang"></el-option>
            <el-option label="2"
                       value="zanting"></el-option>
            <el-option label="3"
                       value="xiaohu"></el-option>

          </el-select>

        </el-form-item>
        <el-form-item>
          <el-button type=""
                     size="mimi"
                     icon="el-icon-search"
                     @click="onSubmit">搜索</el-button>

        </el-form-item>

      </el-form>

      <!-- 主页的内容表格 -->
      <el-table :data="tableData"
                style="width: 94%;margin-left:30px"
                border
                v-if="show"
                :cell-style="{padding:'3px'}"
                :header-cell-style="{background:'#F2F2F2'}">
        <el-table-column fixed
                         prop="date"
                         label="序号"
                         width="70">
        </el-table-column>
        <el-table-column prop="name"
                         label="模块名称"
                         width="auto">
        </el-table-column>
        <el-table-column prop="province"
                         label="接口名称"
                         width="auto">
        </el-table-column>
        <el-table-column prop="city"
                         label="协议类型"
                         width="auto">
        </el-table-column>
        <el-table-column prop="address"
                         label="method"
                         width="auto">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="mock"
                         width="auto">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="创建者"
                         width="auto">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="创建时间"
                         width="auto">
        </el-table-column>

      </el-table>
      <!-- 分页逻辑 -->
      <el-pagination layout="prev, pager, next"
                     :total="1000"
                     v-if="show">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogCreatVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      show: false,
      valuee: '',
      formInline: {
        roleName: '',
        rolePlay: '',
        roleText: '',
        domains: [{
          value: ''
        }],
        Dbs: [{
          value1: ''
        }]
        // mocks: [{
        //   value1: ''
        // }],
      },
      formEdit: {
        roleNameEdit: '',
        rolePlayEdit: '',
        roleTextEdit: ''
      },
      tableData: [{
        date: '1',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'http',
        address: '开发组',
        mobile: '12',
        status: '正常'
      }, {
        date: '2',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'https',
        address: '开发组',
        mobile: '13',
        status: '正常'
      }, {
        date: '3',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '22',
        status: '正常'
      }, {
        date: '4',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '32',
        status: '正常'
      }, {
        date: '5',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '3',
        status: '正常'
      }, {
        date: '6',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '4',
        status: '正常'
      }, {
        date: '7',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '5',
        status: '正常'
      }, {
        date: '8',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '6',
        status: '正常'
      }, {
        date: '9',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '7',
        status: '正常'
      }, {
        date: '10',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '89',
        status: '正常'
      }],
      fileList: []
    }
  },
  methods: {

    onSubmit () {
      console.log('submit!');
    },
    creatRoleClick () {
      console.log('新增');
      this.dialogCreatVisible = true
    },
    // 点击编辑按钮事件
    handleEdit (index, row) {
      console.log(index, row);
      // 点击编辑按钮，把对应的数据赋值给对应的input
      this.formInline.roleName = row.name
      this.formInline.roleName = row.province
      this.formInline.roleName = row.city
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.$confirm('确定进行删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {

      });
    },
    removeDb (item) {
      var index = this.formInline.Dbs.indexOf(item)
      if (index !== -1) {
        this.formInline.Dbs.splice(index, 1)
      }
    },
    removeMock (item) {
      var index = this.formInline.mocks.indexOf(item)
      if (index !== -1) {
        this.formInline.mocks.splice(index, 1)
      }
    },
    addDb () {
      this.formInline.Dbs.push({
        value1: '',
        key: Date.now()
      });
    },
    addMock () {
      this.formInline.mocks.push({
        value1: '',
        key: Date.now()
      });
    },
    // 新增保存按钮
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formEdit);
          this.dialogCreatVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 修改保存按钮
    submitFormEdit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formEdit);
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    beforeRemove (file, fileList) {
      console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onChange (val) {
      console.log(val)
      this.show = true
    }
  }
}
</script>
<style>
.el-main[data-v-5954443c] {
  line-height: 0 !important;
}
.el-input__inner:focus {
  border-color: #1369c2;
}
.el-select-dropdown__item :hover {
  color: #1369c2;
}
</style>
<style lang="less" scoped>
.borderContent {
  width: 5px;
  height: 22px;
  position: absolute;
  top: 60px;
  background-color: #1369c2;
}
.mainContent {
  width: 85%;
  margin: 3% 7%;
  background-color: #fff;
  border: 1px solid #eee;
}
#inputStyle :focus-within {
  border-color: #1369c2;
  border-width: 1px;
}
.el-button {
  background-color: #1369c2;
  color: #fff;
}
.el-form {
  margin-top: 50px;
  margin-bottom: 40px;
}
.el-form--inline .el-form-item[data-v-d9de66ea] {
  margin-right: 27px;
}

.el-form--inline .el-form-item {
  margin-right: 10px;
}
/* 调整表格内的按钮样式 */
.el-button--mini,
.el-button--small {
  height: 25px !important;
}

.delete {
  position: absolute;
  top: 0px;
  left: 292px;
}
// .el-textarea {
//   width: 193px !important;
//   margin-right: 20px;
// }
// .el-input.el-input__inner {
//   width: 74% !important;
// }
.el-form-item .is-required.el-form-item__label.el-form-item__content {
  width: 74% !important;
}
.upload-demo {
  text-align: left;
  // margin: 30px 30px;
}
#listText {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 18px;
  color: #1369c2;
  opacity: 1;
  text-align: left;
  margin-left: 30px;
  margin-bottom: 30px;
}
.el-upload__tip {
  margin-top: 0;
}
</style>