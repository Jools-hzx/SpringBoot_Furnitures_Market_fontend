<template>
  <div>
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--    <el-button type="primary"> My Home View Button</el-button>-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add()">新增</el-button>
      <el-button>其它</el-button>
    </div>

    <!--
    搜索-->
    <div style="margin: 10px 0">
      <el-input v-model="search"
                placeholder=" 请 输 入 关 键 字 "
                style="width:30%">
      </el-input>
      <el-button type="primary" @click="list">查询</el-button>


      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="maker" label="制造商"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="sales" label="销量"></el-table-column>
        <el-table-column prop="stock" label="库存"></el-table-column>

        <el-table-column fixed="right" label="操作" width="140">
          <template #default="scope">
            <!--      传递当前行的数据到函数   -->
            <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
            <el-popconfirm title="Are you sure to delete this?" @confirm="handleDel(scope.row)">
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--
    添加家具的弹窗
    说明:
    1. el-dialog ：v-model="dialogVisible" 表示对话框, 和 dialogVisible 变量双向
      绑定,控制是否显示对话框
    2. el-form :model="form" 表示表单数据和 form数据变量双向绑定
    3. el-input v-model="form.name" 表示表单的 input 控件，名字为name 需要和
      后台Javabean 属性一致
    -->
    <el-dialog title="提示" v-model="dialogVisible" width="30%">
      <!--
        1.指定将创建的规则应用到 form 这个表单
        2.并指定各个字段规则和哪个 el-form-item 关联,通过 prop 指定
        3.一定要注意 prop 和各个规则名相对应，否则不生效
      -->
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="家居名" prop="name">
          <el-input v-model="form.name" style="width: 80%"></el-input>
          {{ validMsg.name }}
        </el-form-item>
        <el-form-item label="厂商" prop="maker">
          <el-input v-model="form.maker" style="width: 80%"></el-input>
          {{ validMsg.maker }}
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" style="width: 80%"></el-input>
          {{ validMsg.price }}
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input v-model="form.sales" style="width: 80%"></el-input>
          {{ validMsg.sales }}
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="form.stock" style="width: 80%"></el-input>
          {{ validMsg.stock }}
        </el-form-item>
      </el-form>
      <template #footer>
         <span class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="save">确 定</el-button>
         </span>
      </template>
    </el-dialog>

    <!--
      1. 在 dialog 之后,加分页导航条
      2. 当修改每页显示几条记录就会触发 handlePageSizeChange
      3. 点击分页，触发 handleCurrentChange 方法
      4. 需要绑定的变量
          currentPage
          pageSize total
    -->
    <div style="margin: 10px 0">
      <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10]"
          :page-size="pageSize"
          background layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>


<script>

import request from "@/utils/request"
import {ElMessage} from "element-plus";

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  data() {
    return {
      form: {},
      dialogVisible: false,
      search: '',
      tableData: [],  //存储查询得到的数据
      pageSize: 5,    //当前页面容量
      currentPage: 1, //当前页码
      total: 10,   //总数据量
      validMsg: {},
      rules: {    //表单校验规则
        name: [
          {required: true, message: '请输入称家居名', trigger: 'blur'}
        ],
        maker: [
          {required: true, message: '请输入称制造商', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入价格', trigger: 'blur'},
        ],
        sales: [
          {required: true, message: '请输入销量', trigger: 'blur'},
          {pattern: /^(([1-9]\d*)|(0))(\.\d+)?$/, message: '请输入数字', trigger: 'blur'}
        ],
        stock: [
          {required: true, message: '请输入库存', trigger: 'blur'},
          {pattern: /^(([1-9]\d*)|(0))$/, message: '请输入数字', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.list();  //更新请求分页
  },
  methods: {
    //页面容量发生了改变
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.list();
    },
    //当前页码发生了改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.list();
    },
    list() {    //完成显示所有家具信息
      request.get(
          "/api/listByPage",
          {
            params: {
              currentPage: this.currentPage,
              pageSize: this.pageSize,
              search: this.search
            }
          }
      ).then(res => {
        // console.log(res);
        //更新分页数据
        this.total = res.data.total;
        this.tableData = res.data.records;
      })
    },
    add() {
      this.validMsg = {}; //每次打开对话框清空验证警告
      this.dialogVisible = true;
      this.form = {}; //每次请求添加则清空表单信息
      this.$refs['form'].resetFields(); //将上传验证的消息清空
    },
    handleDel(row) {
      console.log("待删除的家具id:", row.id);
      request.delete(
          "/api/delById",
          {
            params: {
              id: row.id
            }
          }
      ).then(res => {
            console.log(res);
            if (res.code === "200") {
              ElMessage({
                message: 'Delete Successfully!',
                type: 'success',
                plain: true,
              })
            } else {
              ElMessage({
                message: 'Delete Fail!',
                type: "error",
                plain: false,
              })
            }
            //重新请求待刷新的数据
            this.list();
          }
      )
    },
    handleEdit(row) {  //完成更新操作
      console.log("id:", row.id);
      this.form = {}; //每次请求添加则清空表单信息
      //打开对话框
      this.dialogVisible = true;
      //向后端发送请求，通过 id 查询数据库返回该记录的最新数据
      request.get(
          "/api/findById",
          {
            params: {
              id: row.id
            }
          }
      ).then(res => {
        // console.log(res);
        this.form = res.data;
      })
    },
    save() {
      //如果表单数据校验成功
      this.$refs['form'].validate((valid) => {

        //临时测试;设置为 true
        // valid = true;

        if (valid) {
          //如果当前打开对话中的 form 存在 id 说明是更新操作
          if (this.form.id != null) {
            request.put(
                "/api/update",
                this.form
            ).then(res => {
              console.log(res);
              if (res.code === "200") {
                ElMessage({
                  message: 'Update Successfully!',
                  type: 'success',
                  plain: true,
                })
              } else {
                ElMessage({
                  message: 'Update Fail!',
                  type: "error",
                  plain: false,
                })
              }
              this.dialogVisible = false
              this.list();  // 每次添加完数据之后刷新请求最新数据
            })
          } else {
            //如果不存在 id 说明是添加操作
            request.post(
                "/api/save",
                this.form
            ).then(res => {
              console.log(res);
              if (res.code === "200") {
                ElMessage({
                  message: 'Save Successfully!',
                  type: 'success',
                  plain: true,
                })
                this.dialogVisible = false
              } else {
                ElMessage({
                  message: 'Fail!',
                  type: "error",
                  plain: false,
                });
                this.validMsg.name = res.data.name
                this.validMsg.sales = res.data.sales
                this.validMsg.price = res.data.price
                this.validMsg.maker = res.data.maker
                this.validMsg.stock = res.data.stock
              }
              this.list();  // 每次添加完数据之后刷新请求最新数据
            })
          }
        } else {
          ElMessage({
            message: '验证失败,禁止提交',
            type: "error",
            plain: false,
          })
        }
      })
    }
  }
}
</script>
