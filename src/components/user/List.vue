<template>
  <div class="index">
    <div class="content-head">

      <el-select v-model="value" placeholder="请选择企业类型" style="width: 100px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-input placeholder="请输入内容" v-model="input5" style="width: 360px;">
        <el-select v-model="select" slot="prepend" placeholder="请选择..." style="width: 110px;">
          <el-option label="企业名称" value="1"></el-option>
          <el-option label="上级名称" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="search"></el-button>
      </el-input>
    </div>
    <div class="comtent-list" style="text-align: center;">
      <el-table :data="schoolFeeData.list" max-height="510">
        <el-table-column label="创建时间" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="LOGO" width="80">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.logo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="80">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" width="140">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上级名称" width="140">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.pname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地区地址" width="200">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.status==0">启用</span>
            <span style="margin-left: 10px" v-else>停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" size="small" @click="getRecordList(scope.row)">进入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comtent-paging">
      <el-pagination @size-change="pagingUpdatesData" @current-change="pagingUpdatesData"
                     :current-page.sync="schoolFeeData.pageData.current" :page-sizes="[50, 100, 200]"
                     :page-size="schoolFeeData.pageData.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="schoolFeeData.pageData.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../.././router'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    created () {
//      this.initSchoolFeeListData(this.schoolFeeData.pageData)
    },
    computed: {
      ...mapGetters([
        'schoolFeeData',
        'publicParameters'
      ])
    },
    data () {
      return {
        options: [{
          value: '1,2',
          label: '全部'
        }, {
          value: '1',
          label: '服务商'
        }, {
          value: '2',
          label: '学校'
        }],
        value: '1,2',
        input5: '',
        select: '1',
        schoolFeeModal: false,
        dialogTitle: '',
        schoolFeeForm: {
          url: null,
          id: null,
          name: null,
          desc: null,
          link: null,
          isLimit: '1',
          status: '0'
        },
        schoolFeeRule: {
          name: [
            {required: true, message: '请填写名称!', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'initSchoolFeeListData'
      ]),
      pagingUpdatesData (val) {
        this.initSchoolFeeListData(this.pageData)
      },
      filterTag (value, row) {
        return row.tag === value
      },
      // 新增收费项目
      addSchoolFee () {
        this.schoolFeeForm = {}
        this.schoolFeeForm.isLimit = '1'
        this.schoolFeeForm.status = '0'
        this.dialogTitle = '新增'
        this.schoolFeeForm.url = this.publicParameters.path + '/project/add'
        this.schoolFeeModal = true
      },
      // 修改收费项目
      schoolFeeModify (index) {
        this.dialogTitle = '修改'
        this.schoolFeeForm.url = this.publicParameters.path + '/project/modify'
        this.schoolFeeForm = index
        this.schoolFeeForm.isLimit = index.isLimit + ''
        this.schoolFeeForm.status = index.status + ''
        this.schoolFeeModal = true
      },
      // 名单跳转
      getRecordList (index) {
        console.log(index)
        router.push('/record/list?i=' + index.id + '&n=' + index.name + '&is=' + index.isLimit)
      },
      // 表单提交
      schoolFeeSubmit () {
        var current = this
        axios({
          method: 'POST',
          url: this.schoolFeeForm.url,
          params: {
            accessToken: localStorage.getItem('accessToken'),
            id: this.schoolFeeForm.id,
            name: this.schoolFeeForm.name,
            isLimit: this.schoolFeeForm.isLimit,
            desc: this.schoolFeeForm.desc,
            link: this.schoolFeeForm.link,
            status: this.schoolFeeForm.status
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.initSchoolFeeListData(current.pageData)
            current.schoolFeeModal = false
            current.messageRemind('success', response.data.message)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      messageRemind (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .index {
    margin: 0px 192px 0px 192px;
  }

  .content-head {
    text-align: left;
    height: 36px;
    margin-top: 32px;
    margin-bottom: 30px;
  }

  /*.comtent-list {*/
  /*max-height: calc(100vh - 230px);*/
  /*overflow: scroll;*/
  /*}*/

  .comtent-paging {
    float: right;
    padding-top: 30px;
  }

  .submit-button {
    width: 100%;
    float: right;
    background-color: #31a7ff;
    color: #ffffff;
    border: 0px solid #ffffff
  }

  .school-fee-form {
    padding: 0px;
    margin-right: 20px;
  }

  .close-button-vessel {
    background: #4db3ff;
    padding: 15px;
    margin-bottom: 22px;
    text-align: right;
    span {
      float: left;
      color: #ffffff;
      font-size: 16px;
    }
    .close-button {
      cursor: pointer;
    }
  }
</style>
