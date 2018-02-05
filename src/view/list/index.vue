<template>
  <search-page :page="page" :list="list" @search="search" >
    <el-form slot='form' inline  size='mini'  ref='form' :model='form' label-width='70px'>
      <el-row>
        <el-col :span='6' >
          <el-form-item label='类型' prop='deviceType'>
            <el-select
              v-model='form.deviceType'
              placeholder='选择类型'
              style="width: 185px"
            >
              <el-option
                v-for='(type,p) in deviceTypeOptions'
                :key='p'
                :label='type.name'
                :value='p'>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='6'>
          <el-form-item label='名称' prop='deviceName'>
            <el-input v-model="form.deviceName" placeholder='输入名称'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='6'>
          <el-form-item label='生产厂家' prop='deviceCompany'>
            <el-input v-model="form.deviceCompany" placeholder='输入生产厂家'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='3' :offset='3'>
          <el-button size='mini' type='primary' @click='search'>查询</el-button>
          <el-button size='mini'  @click='resetForm("form")'>重置</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='6'>
          <el-form-item label='尺寸' prop='deviceSize'>
            <el-input v-model="form.deviceSize" placeholder='输入尺寸'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='6'>
          <el-form-item label='型号' prop='deviceModel'>
            <el-input v-model="form.deviceModel" placeholder='输入型号'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      slot="table"
      stripe
      size='mini'
      :data='list'
      class="table-list"
      :height="baseOption.useHeight - 50"
      :highlight-current-row='true'
      @selection-change='handleSelectionChange'
    >
      <el-table-column
        type='selection'
        width='55'>
      </el-table-column>
      <el-table-column
        prop='deviceName'
        align='center'
        label='名称'>
      </el-table-column>
      <el-table-column
        align='center'
        width='130'
        label='类别'>
        <template slot-scope='scope'>
          {{scope.row.deviceId | getDevTypeNameById}}
        </template>
      </el-table-column>
      <el-table-column
        prop='deviceCompany'
        align='center'
        label='生产厂家'>
      </el-table-column>
      <el-table-column
        prop='deviceSize'
        width='90'
        align='center'
        label='尺寸'>
      </el-table-column>
      <el-table-column
        prop="deviceModel"
        align='center'
        width='150'
        label='型号'>
      </el-table-column>
      <el-table-column
        align='center'
        width='150'
        label='操作'>
        <template slot-scope='scope'>
          <el-button size='mini' type='text' @click="openModel(scope.row)" class="table-detail-button">编辑</el-button>
          <el-button size='mini' type='text' @click="delDevices([scope.row.deviceId])" class="table-detail-button">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dropdown @command='commandCheck' slot="table-dropdown" placement='top'  size='mini' split-button type='primary'>
      操作
      <el-dropdown-menu slot='dropdown'>
        <el-dropdown-item command='delCheck'>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <static-device-model @refresh="search" ref="device" :show.sync="showStaticDeviceModel" title="编辑" />
  </search-page>
</template>

<script>
import SearchPage from '@/common/SearchPage';
import StaticDeviceModel from './components/StaticDeviceModel';
import deviceRes from '@/resource/device';
import CONST from '@/const/device';
import base from '@/mixin/base';

export default {
  mixins: [base],
  name: 'deviceManageIndex',
  components: {
    SearchPage,
    StaticDeviceModel
  },
  data () {
    return {
      showStaticDeviceModel: false,
      deviceTypeOptions: CONST.type,
      form: {
        deviceType: 'pre',
        deviceName: '',
        deviceCompany: '',
        deviceSize: '',
        deviceModel: ''
      },
      page: {
        pagination: {
          total: 0,
          current: 1,
          size: 20,
        },
        multipleSelection: [],
        isIndeterminate: false,
        checkAll: false,
      },
      list: []
    };
  },
  methods: {
    handleSelectionChange (val) {
      this.page.multipleSelection = val;
    },
    openModel (device) {
      this.$refs.device.open(device);
    },
    search () {
      deviceRes.getDeviceByPage(this.form, this.page.pagination).then(({data}) => {
        this.list = data.content;
        this.page.pagination.total = data.totalElements;
        this.page.pagination.size = data.size;
        this.page.pagination.current = data.number + 1;
      }).catch(() => {
        this.list = [];
      });
    },
    commandCheck (command) {
      this[command]();
    },
    delCheck () {
      const ids = this.page.multipleSelection.map(item => item.deviceId);
      if (ids.length) {
        this.delDevices(ids)
      } else {
        this.$message({
          type: 'warning',
          message: '请勾选要删除的设备'
        })
      }
    },
    delDevices (ids) {
      let vm = this;
      this.$confirm('该操作会删除设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const type = vm.form.deviceType;
        deviceRes.deleteDevice(type, ids).then(() => {
          vm.search();
        });
      });
    },
    resetForm (form) {
      this.$refs[form].resetFields();
    },
  }
};
</script>

<style lang="less" scoped>
</style>
