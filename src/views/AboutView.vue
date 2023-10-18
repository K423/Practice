<template>
  <div class="about" style="width: 90%; margin: 0 auto;">
    <h1>信息查询中心</h1>
    <!-- <el-button type="success">默认按键</el-button> -->
    <el-card class="box-card">
      <el-input v-model="query.name" style="width: 200px;" placeholder="请输入用户名" clearable></el-input>

      <el-button type="primary" @click="getByName()" style="margin-left: 20px;">查询</el-button>
      <el-button type="primary" @click="addForm()">新增</el-button>
      <el-button type="info" style="float: right;" @click="reset()">重置列表</el-button>
    </el-card>
    <br>
    <!-- 新增表单 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label=" 用户名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别" style="float: left;">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
            <el-option label="保密" value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" :action="url" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="form.avatar" :src="form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改表单 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible1">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label=" 用户名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别" style="float: left;">
            <el-option v-for="(option, index) in genderOptions" :key="index" :label="option.label"
              :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" :action="url" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="form.avatar" :src="form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 数据列表 -->
    <el-table :data="tableData" style="width: 100%" center>
      <el-table-column fixed prop="createTime" label="注册时间" width="150" />
      <el-table-column prop="name" label="用户名" width="120" />
      <el-table-column prop="gender" label="性别" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.gender === 1">男</span>
          <span v-else-if="scope.row.gender === 0">女</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120" />
      <el-table-column prop="email" label="邮箱地址" width="150" />
      <el-table-column prop="updateTime" label="更新时间" width="150" />
      <el-table-column prop="avatar" label="头像" width="120">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="100" fit="fill" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div class="block" style="float: left;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page=this.page :page-sizes="[5, 10, 20]" :page-size=this.pageSize
        layout="total, sizes, prev, pager, next, jumper" :total=this.totals>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/index"
import { addUserInfo } from "@/api/index"
import { updateUserInfo } from "@/api/index"
import { deleteUserInfo } from "@/api/index"


export default {
  name: 'AboutView',
  data() {
    return {
      url: 'http://localhost:1234/file/upload?module=avatar',
      query: {
        name: ''
      },
      page: 1,
      pageSize: 5,
      totals: 0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        id: '',
        name: '',
        password: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        avatar: '',
        createTime: '',
        updateTime: ''
      },
      genderOptions: [
        { label: '男', value: 1 },
        { label: '女', value: 0 },
        { label: '保密', value: -1 }
      ],
      tableData: [
      ],
      formLabelWidth: '80px',
      rules: {
        name: [
          { required: true, message: '用户名为空', trigger: 'blur' },
          { min: 3, max: 24, message: '长度在 3 到 24 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱为空', trigger: 'blur' },
          {
            pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        phone: [
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        age: [
          {
            validator: (rule, value, callback) => {
              if (!value || value < 0 || value > 120) {
                callback(new Error('请输入有效的年龄'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      // console.log(res)
      // console.log(res.data)
      this.form.avatar = `http://localhost:1234/file/download?name=${res.data}`
      this.$forceUpdate()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //获取数据列表
    getInfoList() {
      getList(this.page, this.pageSize, this.query.name).then((resp) => {
        console.log(resp.data)
        this.totals = resp.data.totals
        this.tableData = resp.data.rows
      })
    },
    //编辑
    handleEdit(index, row) {
      console.log(row)
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible1 = true
    },
    //删除
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserInfo(row.id)
        this.getInfoList()
        this.$forceUpdate()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });

    },
    //改变单页显示数量
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getInfoList();
    },
    //显示第n页数据
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getInfoList();
    },
    //通过用户名查询
    getByName() {
      if (this.query.name == '') {
        alert("查询条件为空")
      } else {
        this.getInfoList()
      }
    },
    //数据重置
    reset() {
      this.page = 1
      this.pageSize = 5
      this.query.name = ''
      this.getInfoList()
    },
    //新增表单
    addForm() {
      this.form = {}
      this.dialogFormVisible = true
    },
    //新增用户
    addUser() {
      addUserInfo(this.form)
    },
    //提交数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser();
          this.dialogFormVisible = false
          this.getInfoList();
          this.$forceUpdate()
          this.$notify({
            title: 'SUCCESS',
            message: '新用户添加成功',
            type: 'success'
          });
        } else {
          this.$message('请填写有效信息');
          return false;
        }
      });
    },
    //修改数据
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUserInfo(this.form)
          this.getInfoList();
          this.$forceUpdate()
          this.dialogFormVisible1 = false
          this.$notify({
            title: 'UPDATE',
            message: '用户信息修改成功',
            type: 'success'
          });
        } else {
          this.$message('请填写有效信息');
          return false;
        }
      });
    },

  },
  created() {
    //初始化调用方法
    this.getInfoList();
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d39696;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float: left;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
