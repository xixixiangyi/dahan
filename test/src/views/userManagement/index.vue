<template>
  <div>
    <div class="header"
         style="width:200px; margin-left: 250px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 40px;">系统管理-用户管理</div>
    </div>
    <div class="mainContent">
      <el-form :inline="true"
               :model="formInline"
               style="700px"
               class="demo-form-inline">
        <el-form-item label="账户名">
          <el-input v-model="formInline.username"
                    placeholder="请输入账户名"></el-input>
        </el-form-item>
        <el-form-item label="账户状态">
          <el-select v-model="formInline.state"
                     :popper-append-to-body="false"
                     placeholder="账户状态">
            <el-option label="正常"
                       value="0"></el-option>
            <el-option label="暂停"
                       value="1"></el-option>
            <el-option label="销户"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type=""
                     size="mimi"
                     icon="el-icon-search"
                     @click="onSubmit">搜索</el-button>
          <el-button type="mimi"
                     icon="el-icon-plus"
                     @click="onSubmit1">创建用户</el-button>

        </el-form-item>

      </el-form>
      <!-- 点击创建用户弹出页面 -->
      <el-dialog title="用户管理-创建用户"
                 style="text-align:left"
                 width="40%"
                 top="10vh"
                 :visible.sync="dialogCreatVisible">
        <el-form :model="formInline"
                 style="width: 400px;">
          <el-form-item label="账户名:"
                        :label-width="formLabelWidth">

            <el-input style="margin-left:0px"
                      v-model="formCreate.uid"></el-input>

          </el-form-item>
          <el-form-item label="用户名:"
                        :label-width="formLabelWidth">
            <div id="inputStyle">
              <el-input v-model="formCreate.username"> </el-input>
            </div>
          </el-form-item>
          <el-form-item label="项目组:"
                        :label-width="formLabelWidth">
            <el-select v-model="formCreate.group"
                       placeholder="请选择"
                       filterable
                       style="width: 100%">
              <el-option v-for="item in groupData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色:"
                        :label-width="formLabelWidth">
            <el-select v-model="formCreate.role"
                       filterable
                       style="width: 100%"
                       placeholder="请选择">
              <el-option v-for="item in roleData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户状态"
                        :label-width="formLabelWidth">
            <el-select v-model="formCreate.state"
                       :popper-append-to-body="false"
                       placeholder="账户状态">
              <el-option label="正常"
                         value="0"></el-option>
              <el-option label="暂停"
                         value="1"></el-option>
              <el-option label="销户"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="邮箱:"
                        :label-width="formLabelWidth">
            <div id="inputStyle">
              <el-input></el-input>
            </div>
          </el-form-item>
          <el-form-item label="手机号码:"
                        :label-width="formLabelWidth">
            <div id="inputStyle">
              <el-input></el-input>
            </div>
          </el-form-item> -->
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     icon=" iconfont icon-baocun"
                     @click="save()">保存</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                v-loading="loading"
                style="width: auto;margin:30px"
                border
                :header-cell-style="{background:'#F2F2F2'}">
        <el-table-column fixed
                         type="index"
                         prop="date"
                         label="序号"
                         width="50">
        </el-table-column>
        <el-table-column prop="userid"
                         label="账户名"
                         width="auto">
        </el-table-column>
        <el-table-column prop="username"
                         label="用户名"
                         width="auto">
        </el-table-column>
        <el-table-column prop="group"
                         label="归属项目组"
                         width="auto">
        </el-table-column>
        <el-table-column prop="role"
                         label="角色"
                         width="auto">
        </el-table-column>
        <!-- <el-table-column prop="mobile"
                         label="联系方式"
                         width="auto">
        </el-table-column> -->
        <el-table-column prop="state"
                         label="状态"
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
      <el-pagination layout="sizes,prev, pager, next"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="pagesize"
                     :total="tableData.length"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange">
      </el-pagination>

    </div>
    <!-- 点击编辑弹出页面 -->
    <el-dialog title="用户管理-用户修改"
               style="text-align:left"
               width="40%"
               top="10vh"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               style="width: 400px;">
        <el-form-item label="账户名:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.uid"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="用户名:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.username"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="项目组:"
                      :label-width="formLabelWidth">
          <el-select v-model="form.group"
                     style="width: 100%"
                     ref="addgroup">
            <el-option v-for="item in groupData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色:"
                      :label-width="formLabelWidth">
          <el-select v-model="form.role"
                     style="width: 100%">
            <el-option v-for="item in roleData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户状态"
                      :label-width="formLabelWidth">
          <el-select v-model="form.state"
                     :popper-append-to-body="false"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>

          </el-select>
        </el-form-item>
        <!-- <el-form-item label="邮箱:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.email"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="手机号码:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.mobile"></el-input>
          </div>
        </el-form-item> -->
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   icon="iconfont icon-xiugai"
                   @click="handleUserSave()">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagesize: 10,
      currpage: 1,
      loading: false,
      dialogFormVisible: false,
      dialogCreatVisible: false,
      formLabelWidth: '120px',
      value: '',
      //搜索条件表单
      formInline: {
        username: '',
        state: '',
      },
      // 点击编辑弹出页面内容表单
      form: {
        username: '',
        uid: '',
        group: '',
        role: '',
        state: ''
      },
      //状态下拉的数据
      options: [{
        id: '0',
        name: '正常使用'
      }, {
        id: '1',
        name: '暂停'
      }, {
        id: '2',
        name: '销户'
      }],
      //点击创建内容的表单保存
      formCreate: {
        username: '',
        uid: '',
        group: '',
        role: '',
        state: ''
      },
      groupData: '',//项目组下拉存放数据
      roleData: '',//角色下拉存放数据
      tableData: []
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
    //搜索
    onSubmit () {
      console.log('搜索!');
      this.loading = true
      this.$http.getUserSearch().then((res) => {
        console.log(res.data.data);
        if (res.data.data && res.data.code == '0000') {
          this.tableData = res.data.data
          this.loading = false
          this.totalCount = res.data.paging.totalpage;//总信息条数从数据库获取;
          console.log(this.totalCount)
        }
      });
    },
    //创建
    onSubmit1 () {
      console.log('创建!');
      this.handleGroup()
      this.handleRole()
      this.dialogCreatVisible = true
    },
    //组别下拉接口
    handleGroup () {
      this.$http.getUserGroup().then((res) => {
        console.log(res.data.data);
        this.groupData = res.data.data
      });
    },
    //角色下拉接口
    handleRole () {
      this.$http.getUserRole().then((res) => {
        console.log(res.data.data);
        this.roleData = res.data.data
      });
    },
    //修改接口
    handleEditSave () {

      this.$http.getUserEdit(this.form).then((res) => {
        console.log(res.data.code);
        if (res.data.code == '0000') {
          this.dialogFormVisible = false
          this.onSubmit()
        }
      });
    },
    //点击编辑按钮执行的事件
    handleEdit (index, row) {
      console.log(index, row, '编辑');
      this.handleRole()//角色下拉接口
      this.handleGroup()
      this.form.group = row.group
      this.form.uid = row.userid
      //循环角色下拉框找到对应的id
      this.$http.getUserRole().then((res) => {
        console.log(res.data.data);
        this.roleData = res.data.data
        for (let i = 0; i < this.roleData.length; i++) {
          if (this.roleData[i].name == row.role) {
            this.form.role = this.roleData[i].id
          }
        }
      });
      //循环组别下拉，找到对应的id
      this.$http.getUserGroup().then((res) => {
        console.log(res.data.data);
        this.groupData = res.data.data
        for (let i = 0; i < this.groupData.length; i++) {
          if (this.groupData[i].name == row.group) {
            this.form.group = this.groupData[i].id
          }
        }
      });
      //循环状态下拉框，找到对应的value
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name == row.state) {
          this.form.state = this.options[i].id
        }
      }




      this.form.username = row.username
      // this.form.role = row.role
      this.dialogFormVisible = true
    },
    // 创建用户的保存
    save () {
      let aa = this.formCreate
      this.$http.getUserAdd(aa).then((res) => {
        if (res.data.code == '0000') {
          console.log(res)
          this.dialogCreatVisible = false
          this.onSubmit(this.formInline)
        }

      });

    },
    //删除事件
    handleDelete (index, row) {
      console.log(index, row)
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
    handleCurrentChange (cpage) {
      this.currpage = cpage;
    },
    handleSizeChange (psize) {
      console.log(psize)
      this.pagesize = psize;
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    //点击编辑页面的修改
    handleUserSave () {
      console.log(this.form)
      this.handleEditSave()

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
.el-button--primary {
  color: #fff;
  background-color: #1369c2 !important;
  border-color: #1369c2 !important;
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
  text-align: left;
  margin-left: 30px;
}
.el-form--inline .el-form-item[data-v-d9de66ea] {
  margin-right: 27px;
}

.el-form--inline .el-form-item {
  margin-right: 10px;
  margin-bottom: 20px;
}
.el-pagination .el-select .el-input .el-input__inner {
  width: 100px !important;
}
</style>