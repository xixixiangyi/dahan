<template>
  <div>
    <div class="header"
         style="width:270px; margin-left: 200px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 45px;">测试任务管理-测试报告管理</div>
    </div>
    <div class="mainContent">
      <el-tabs type="border-card">
        <el-tab-pane label="任务执行结果查看">
          <el-form :inline="true"
                   :model="formInline"
                   class="demo-form-inline">

            <el-form-item label="任务名称">
              <el-input v-model="formInline.user"
                        placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="创建者">
              <el-input v-model="formInline.user"
                        placeholder="请输入创建者"></el-input>
            </el-form-item>
            <el-form-item label="执行结果">
              <el-input v-model="formInline.user"
                        placeholder="请输入执行结果"></el-input>
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
                    :cell-style="{padding:'1px'}"
                    :header-cell-style="{background:'#F2F2F2'}">
            <el-table-column fixed
                             prop="date"
                             label="序号"
                             width="70">
            </el-table-column>
            <el-table-column prop="name"
                             label="任务ID"
                             width="auto">
            </el-table-column>
            <el-table-column prop="province"
                             label="任务名称"
                             width="auto">
            </el-table-column>
            <el-table-column prop="city"
                             label="归属任务集"
                             width="auto">
            </el-table-column>
            <el-table-column prop="address"
                             label="发送邮件"
                             width="auto">
            </el-table-column>
            <el-table-column prop="mobile"
                             label="重试次数"
                             width="auto">
            </el-table-column>
            <el-table-column prop="mobile"
                             label="包含接口数量"
                             width="auto">
            </el-table-column>
            <el-table-column prop="mobile"
                             label="执行时长"
                             width="auto">
            </el-table-column>
            <el-table-column prop="mobile"
                             label="执行结果"
                             width="auto">
            </el-table-column>
            <el-table-column prop="mobile"
                             label="执行人/时间"
                             width="auto">
            </el-table-column>
            <el-table-column label="操作"
                             width="220">
              <template slot-scope="scope">

                <el-button @click="handleClickDetails(scope.row)"
                           type="text"
                           size="small"
                           style="background-color:#fff;color:#1369c2">任务详情</el-button>
                <el-button type="text"
                           @click="handleClickExecute(scope.row)"
                           size="small"
                           style="background-color:#fff;color:#1369c2">立即执行</el-button>

                <el-button type="text"
                           size="small"
                           @click="handleReport(scope.$index, scope.row)"
                           style="background-color:#fff;color:#1369c2">查看报告</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页逻辑 -->
          <el-pagination layout="prev, pager, next"
                         :total="1000">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="任务集执行结果查看">
          <div style="height:500px">
            <div style="margin: 100px auto;color:skyblue;font-size:20px">我还没有定下来哦~期待后期的我吧</div>
          </div>

        </el-tab-pane>
      </el-tabs>
      <!-- 点击详情弹出页面 -->
      <el-dialog title="查看详情"
                 style="text-align:left"
                 width="50%"
                 top="10vh"
                 @open='openContent()'
                 :modal-append-to-body='false'
                 append-to-body
                 :visible.sync="dialogDetailsVisible">
        <el-table :show-header="false"
                  :data="tableData3"
                  border
                  :cell-style="columnStyle"
                  style="width: 100%; margin-top: 20px">

          <el-table-column width="180"
                           prop="name"></el-table-column>
          <el-table-column prop="amount1">
            <template slot-scope="scope">
              <el-button size="mini"
                         v-if='(scope.$index)==(tableData3.length-1)'>查看报告</el-button>
              <span prop="amount1"
                    v-else>{{scope.row.amount1}}</span>
            </template>
          </el-table-column>

        </el-table>

      </el-dialog>
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
      amount: '',
      province: '',
      dialogCreatVisible: false,
      dialogFormVisible: false,
      dialogDetailsVisible: false,
      formLabelWidth: '120px',
      reportButton: false,
      dataForm: {},
      formInline: {
        roleName: '',
        rolePlay: '',
        roleText: '',
        domains: [{
          value: ''
        }],
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
      }],
      tableData1: [{
        name: '1',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '2',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '4',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '5',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '3',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '9',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '2',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '4',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '6',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '2',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }]
    }
  },
  computed: {
    //因为数据用到了dataform中的数据，所以写在了computed中
    tableData3 () {
      return [
        {
          name: "执行编号",
          amount1: this.amount,

        },
        {
          name: "任务名称",
          amount1: this.province,
        },
        {
          name: "任务说明",
          amount1: '会员名称',
        },
        {
          name: "基础信息",
          amount1: '用户来源',
        },
        {
          name: "执行方式",
          amount1: '用户来源',
        },
        {
          name: "执行间隔",
          amount1: '用户来源',
        },
        {
          name: "重试次数",
          amount1: '用户来源',
        },
        {
          name: "发送邮件",
          amount1: '用户来源',
        },
        {
          name: "执行状态",
          amount1: '用户来源',
        },
        {
          name: "执行结果",
          amount1: '用户来源',
        },
        {
          name: "测试报告",
        },
      ];
    }
  },
  methods: {
    // 自定义列背景色
    columnStyle ({ rowIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      if (rowIndex % 2 !== 0) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      } else {
        return "background:#ffffff;";
      }
    },
    // 点击renwuxiangq 
    handleEdit1 (index, row) {
      console.log(index, row);

    },
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
    //执行事件按钮
    handleClickExecute () {
      //  console.log(index, row);
      this.$confirm('确定要立即执行此任务所有用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '创建成功!'
        });
      }).catch(() => {

      });
    },
    //日志详情按钮操作事件
    //详情事件按钮
    handleClickDetails (row) {
      console.log(row, '详情');
      this.amount = row.date,
        this.province = row.province,
        this.dialogDetailsVisible = true

    },
    // 报告点击事件
    handleReport () {
      window.open('https://element.eleme.io')
    },
    openContent () {
      console.log(this.tableData3)
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
  margin-top: 30px;
  margin-bottom: 20px;
  margin-right: 205px;
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
//任务详情页面
.el-card.is-always-shadow {
  width: 50%;
}
</style>