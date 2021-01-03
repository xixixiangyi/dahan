<template>
  <div>
    <div class="header"
         style="width:270px; margin-left: 200px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 80px;">用例管理-产品模块管理</div>
    </div>
    <div class="mainContent">
      <el-form :inline="true"
               :model="formInline"
               style="width: 900px"
               class="demo-form-inline">
        <el-form-item label="归属产品">
          <el-input v-model="formInline.user"
                    placeholder="请输入归属产品"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="formInline.user"
                    placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type=""
                     size="mimi"
                     icon="el-icon-search"
                     @click="onSubmit">搜索</el-button>
          <el-button type="mimi"
                     icon="el-icon-plus"
                     @click="creatRoleClick()">新增</el-button>
        </el-form-item>

      </el-form>
      <!-- 点击新增弹出页面 -->
      <el-dialog title="用例管理-产品模块的新增"
                 style="text-align:left"
                 width="50%"
                 :inline="true"
                 top="10vh"
                 :visible.sync="dialogCreatVisible">
        <el-form :model="formInline"
                 ref="formInline"
                 :inline="true"
                 style="width: 560px;">
          <el-form-item label="产品模块名称:"
                        :label-width="formLabelWidth">

            <el-input style="margin-left:0px"
                      v-model="formInline.roleName"></el-input>

          </el-form-item>
          <el-form-item label="归属产品:"
                        :label-width="formLabelWidth">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>
          <!-- 测试环境信息新增内容 -->
          <el-form-item v-for="(domain, index) in formInline.domains"
                        :label="'测试环境信息' + index+':'"
                        :key="domain.key"
                        :label-width="formLabelWidth"
                        :prop="'domains.' + index + '.value'"
                        :rules="{
      required: true, message: '测试环境信息不能为空', trigger: 'blur'
    }">
            <el-input v-model="domain.value"
                      type="textarea"></el-input>

            <el-button v-if="index >= 1"
                       type="danger"
                       @click.prevent="removeDomain(domain)">删除</el-button>

          </el-form-item>
          <el-form-item>
            <el-button @click="addDomain"
                       style="    margin-top: 14px;">新增</el-button>
          </el-form-item>
          <!-- mock配置新增按钮 -->
          <!-- <el-form-item v-for="(mock, index) in formInline.mocks"
                        :label="'MOCK配置' + index+':'"
                        :key="mock.key"
                        :label-width="formLabelWidth"
                        :prop="'mocks.' + index + '.value1'"
                        :rules="{
      required: true, message: 'MOCK配置不能为空', trigger: 'blur'
    }">
            <el-input v-model="mock.value1"
                      style="width: 75%;"></el-input>

            <el-button v-if="index >= 1"
                       type="danger"
                       @click.prevent="removeMock(mock)">删除</el-button>
          </el-form-item>
          <el-button @click="addMock">新增</el-button> -->
          <el-form-item label="备注说明:"
                        :label-width="formLabelWidth">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>
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
                       :limit="1"
                       :on-exceed="handleExceed"
                       :auto-upload="false">
              <el-button slot="trigger"
                         size="small"
                         type="">选取文件</el-button>
              <el-button style="margin-left: 10px;"
                         size="small"
                         type=""
                         @click="submitUpload">上传文件</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传excel格式文件，文件不能超过500kb</div>
            </el-upload>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     icon=" iconfont icon-baocun"
                     @click="submitForm('formInline')">保存</el-button>
        </div>
      </el-dialog>
      <!-- 主页的内容表格 -->
      <el-table :data="tableData"
                style="width: 94%;margin-left:30px"
                border
                :cell-style="{padding:'3px'}"
                :header-cell-style="{background:'#F2F2F2'}">
        <el-table-column fixed
                         prop="date"
                         label="序号"
                         width="70">
        </el-table-column>
        <el-table-column prop="name"
                         label="归属产品"
                         width="auto">
        </el-table-column>
        <el-table-column prop="province"
                         label="模块名称"
                         width="auto">
        </el-table-column>
        <el-table-column prop="city"
                         label="环境"
                         width="auto">
        </el-table-column>
        <el-table-column prop="address"
                         label="数据库"
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
        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!-- 分页逻辑 -->
      <el-pagination layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </div>
    <!-- 点击编辑弹出页面 -->
    <el-dialog title="用例管理-产品模块的修改"
               style="text-align:left"
               width="50%"
               :inline="true"
               top="10vh"
               :visible.sync="dialogFormVisible">
      <el-form :model="formInline"
               ref="formInline"
               :inline="true"
               style="width: 560px;">
        <el-form-item label="产品模块名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formEdit.roleNameEdit"></el-input>

        </el-form-item>
        <el-form-item label="归属产品:"
                      :label-width="formLabelWidth">
          <el-input v-model="formEdit.rolePlayEdit"></el-input>
        </el-form-item>
        <!-- 测试环境信息新增内容 -->
        <el-form-item v-for="(domain, index) in formInline.domains"
                      :label="'测试环境信息' + index+':'"
                      :key="domain.key"
                      :label-width="formLabelWidth"
                      :prop="'domains.' + index + '.value'">
          <el-input v-model="formEdit.roleTextEdit"
                    type="textarea"></el-input>

          <el-button v-if="index >= 1"
                     type="danger"
                     @click.prevent="removeDomain(domain)">删除</el-button>

        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain"
                     style="    margin-top: 14px;">新增</el-button>
        </el-form-item>
        <!-- mock配置新增按钮 -->
        <!-- <el-form-item v-for="(mock, index) in formInline.mocks"
                        :label="'MOCK配置' + index+':'"
                        :key="mock.key"
                        :label-width="formLabelWidth"
                        :prop="'mocks.' + index + '.value1'"
                        :rules="{
      required: true, message: 'MOCK配置不能为空', trigger: 'blur'
    }">
            <el-input v-model="mock.value1"
                      style="width: 75%;"></el-input>

            <el-button v-if="index >= 1"
                       type="danger"
                       @click.prevent="removeMock(mock)">删除</el-button>
          </el-form-item>
          <el-button @click="addMock">新增</el-button> -->
        <el-form-item label="备注说明:"
                      :label-width="formLabelWidth">
          <el-input v-model="formInline.rolePlay"></el-input>
        </el-form-item>
        <el-form-item label="测试依赖Excel文件:"
                      label-width="140px">
          <el-upload class="upload-demo"
                     ref="upload1"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     multiple
                     :on-preview="handlePreview1"
                     :on-remove="handleRemove1"
                     :before-remove="beforeRemove1"
                     :file-list="fileList1"
                     :limit="1"
                     :on-exceed="handleExceed1"
                     :auto-upload="false">
            <el-button slot="trigger"
                       size="small"
                       type="">选取文件</el-button>
            <el-button style="margin-left: 10px;"
                       size="small"
                       type=""
                       @click="submitUpload1">上传文件</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传excel格式文件，文件不能超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   icon=" iconfont icon-baocun"
                   @click="submitForm('formInline')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogCreatVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      fileList: [],
      fileList1: [],
      formInline: {
        roleName: '',
        rolePlay: '',
        roleText: '',
        domains: [{
          value: ''
        }],
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
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '12',
        status: '正常'
      }, {
        date: '2',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
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
      }]
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
      this.formEdit.roleNameEdit = row.name
      this.formEdit.rolePlayEdit = row.province
      this.formEdit.roleTextEdit = row.city
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
    removeDomain (item) {
      var index = this.formInline.domains.indexOf(item)
      if (index !== -1) {
        this.formInline.domains.splice(index, 1)
      }
    },
    removeMock (item) {
      var index = this.formInline.mocks.indexOf(item)
      if (index !== -1) {
        this.formInline.mocks.splice(index, 1)
      }
    },
    addDomain () {
      this.formInline.domains.push({
        value: '',
        key: Date.now()
      });
    },
    addMock () {
      this.formInline.mocks.push({
        value1: '',
        key: Date.now()
      });
    },
    submitForm (formName) {
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
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //编辑页面中的上传
    submitUpload1 () {
      this.$refs.upload.submit();
    },
    handleRemove1 (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview1 (file) {
      console.log(file);
    },
    beforeRemove1 (file, fileList) {
      console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed1 (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
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
.el-textarea {
  width: 193px !important;
  margin-right: 20px;
}
</style>