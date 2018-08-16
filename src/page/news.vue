<template>
    <div id="user">
    <!-- 操作 -->
    <ul class="btn-edit fr">
        <li >
            <el-button type="primary" @click="dialogCreateVisible = true">添加用户</el-button>
            <el-button type="primary" icon="delete" :disabled="selected.length==0" @click="removeUsers()"  >删除</el-button>
            <el-button type="primary" icon="edit" :disabled="selected.length==0" >停用</el-button>
            <el-button type="primary" icon="edit" :disabled="selected.length==0" >激活</el-button>
        </li>
    </ul>
    <!-- 用户列表-->
    <el-table :data="users"
              stripe
              v-loading="loading"
              element-loading-text="拼命加载中..."
              style="width: 100%"
              height="443"
              @sort-change="tableSortChange"
              @selection-change="tableSelectionChange">
        <el-table-column type="selection"
                         width="60">
        </el-table-column>
        <el-table-column sortable="custom" prop="username"
                         label="用户名"
                         width="120">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         width="120">
        </el-table-column>
        <el-table-column prop="phone"
                         label="手机"
                         >
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱">
        </el-table-column>
        <el-table-column prop="create_time" sortable="custom" inline-template
                         label="注册日期"
                         width="260">
            <div>{{ row.create_time | moment('YYYY年MM月DD日 HH:mm:ss')}}</div>
        </el-table-column>
        <el-table-column inline-template
                         label="操作"
                         width="250">
            <span>
                <el-button type="primary" size="mini" @click="removeUser(row)">删除</el-button>
                <el-button type="primary" size="mini" @click="setCurrent(row)">编辑</el-button>
            </span>
        </el-table-column>
    </el-table>
    <!--分页begin-->
    <el-pagination class="tc mg"
                   :current-page="filter.page"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="filter.per_page"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total_rows"
                   @size-change="pageSizeChange"
                   @current-change="pageCurrentChange">
    </el-pagination>
    <!--分页end-->
</div>
</template>
