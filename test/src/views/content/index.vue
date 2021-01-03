<template>
  <div>
    <div class="header"
         style="width:200px; margin-left: 250px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 40px;">系统管理-个人中心</div>
    </div>
    <div class="mainContent">
      <el-form label-position="left"
               label-width="90px"
               size="small"
               style="width: 400px;
    margin-left: 300px;
    margin-top: 30px;margin: 80px auto;">
        <el-form-item label="用户名:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.zhanghuName"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="角色名称:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.roseName"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="项目组:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.itemName"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="手机号码:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.mobile"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="邮箱:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.email"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="创建时间:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.creationDate"></el-input>
          </div>
        </el-form-item>

      </el-form>
      <!-- <el-button icon="iconfont icon-baocun"
                 style="text-algin:right">保存</el-button> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLabelWidth: '120px',
      form: {
        zhanghuName: 'ceshirenyuan',
        userName: '测试人员',
        roseName: '测试工程师',
        itemName: 'IP业务测试组',
        mobile: '13233339999',
        email: 'ceshirenyuan@ebupt.com',
        creationDate: '20200430121212',
        name: ''
      }


    }
  },
  created () {

  },
  methods: {


  }
}
</script>
<style>
.el-main[data-v-5954443c] {
  line-height: 0 !important;
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
  height: 600px;
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
</style>