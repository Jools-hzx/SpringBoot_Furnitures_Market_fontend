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


      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="maker" label="制造商"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="sales" label="销量"></el-table-column>
        <el-table-column prop="stock" label="库存"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <!--      传递当前行的数据到函数   -->
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
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
      <el-form :model="form" label-width="120px">
        <el-form-item label="家居名">
          <el-input v-model="form.name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="厂商">
          <el-input v-model="form.maker" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="form.sales" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.stock" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
         <span class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="save">确 定</el-button>
         </span>
      </template>
    </el-dialog>
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
      tableData: []
    }
  },
  created() {
    this.list();
  },
  methods: {
    list() {    //完成显示所有家具信息
      request.get(
          "/api/list"
      ).then(res => {
        console.log("刷新数据:" + res)
        this.tableData = res.data;
        if (res.code === "200") {
          //   ElMessage({
          //     message: '刷新成功',
          //     type: 'success',
          //     plain: true,
          //   })
          // } else {
          //   ElMessage({
          //     message: '刷新失败!',
          //     type: "error",
          //     plain: false,
          //   })
        }
      })
    },
    add() {
      this.dialogVisible = true;
      this.form = {}; //每次请求添加则清空表单信息
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
          } else {
            ElMessage({
              message: 'Fail!',
              type: "error",
              plain: false,
            })
          }
          this.dialogVisible = false
          this.list();  // 每次添加完数据之后刷新请求最新数据
        })
      }
    }
  }
}
</script>
