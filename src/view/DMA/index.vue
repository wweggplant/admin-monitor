<template>
    <el-row class='u-container' :style='{height:`${useHeight}px`}'>
        <el-col class='device-tree' :span='5'>
            <el-tree
                :expand-on-click-node='false'
                ref='tree'
                :default-expand-all='true'
                :highlight-current='true'
                :data='tree'
                :props='defaultProps'
                :render-content='renderContent'
                node-key='dmaId'
                @node-click='getDetail'>
            </el-tree>
        </el-col>
        <el-col class='device-detail full-height' :span='19'>
            <el-form  inline size='mini' class='full-height' label-width='90px'>
                <el-row class='full-height'>
                    <el-col :span='24'  class='flex-box direction-column no-wrap dma-collapse-wrap'>
                        <el-collapse class='dma-collapse'  v-model='activeNames'>
                            <el-collapse-item title='静态属性' name='1'>
                                <el-row>
                                    <el-col :span='6'>
                                        <el-form-item label='类别'  >
                                            <el-select style='width :179px' v-model='current.dmaType' placeholder='请选择类别'>
                                                <el-option v-for='(item,key) in dmaTypeOptions' :key='key' :label='item' :value='key'></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='6'>
                                        <el-form-item label='名称'>
                                            <el-input placeholder='名称' v-model='current.dmaName'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='6'>
                                        <el-form-item label='地址'>
                                            <el-input placeholder='地址' v-model='current.dmaLocation'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='6'>
                                        <el-form-item label='经度'>
                                            <el-input placeholder='经度' v-model.number='current.dmaCorePointLongitude'></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span='6'>
                                        <el-form-item label='纬度'>
                                            <el-input placeholder='纬度' v-model.number='current.domCorePointLatitude'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='6'>
                                        <el-form-item label='工业用户数'>
                                            <el-input placeholder='工业用户数' v-model='current.industryUserCnt'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='6'>
                                        <el-form-item label='管长'>
                                            <el-input placeholder='管长' v-model='current.pipeLength'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='6'>
                                        <el-form-item label='管径'>
                                            <el-input placeholder='管径' v-model='current.dmaBorder'></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span='6'>
                                        <el-form-item label='管材'>
                                            <el-input placeholder='管材' v-model='current.pipeMaterial'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='6'>
                                        <el-form-item label='居民用户数'>
                                            <el-input placeholder='居民用户数' v-model.number='current.civilUserCnt'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='6'>
                                        <el-form-item label='管龄描述'>
                                            <el-input placeholder='管龄描述' v-model='current.pipeAge'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='6'>
                                        <el-form-item label='供水面积'>
                                            <el-input placeholder='供水面积' v-model.number='current.dmaSize'></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                            <el-collapse-item title='关联图片' name='2'>
                                <el-row style='overflow-x: auto;'>
                                    <el-col class='dma-upload-wrap' >
                                        <el-upload
                                            class='dma-upload flex-box jt-end no-wrap direction-row-reverse'
                                            ref='upload'
                                            list-type='picture-card'
                                            :on-preview='handlePictureCardPreview'
                                            action='/pm/dmamanager/uploadDmaImg'
                                            name='file'
                                            :on-remove='handleImgsRemove'
                                            :file-list='currentImgs'
                                            :data='{dmaId:current.dmaId}'
                                            accept='image/png;image/jpg;image/jpeg;'
                                            :on-success='handleImgsUplaodSuccess'
                                            :before-upload='beforeAvatarUpload'>
                                            <i class='el-icon-plus'></i>
                                        </el-upload>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                            <el-collapse-item title='压力计数据' name='3'>
                                <template slot='title'>
                                    压力计数据 <i class='el-icon-circle-plus-outline' @click.stop="openModal('dma_pre','3')"/> <span class='collapse-title-badge pull-right'>{{dma_pre.length}}</span>
                                </template>
                                <dma-device :type='deviceTypes[0]' ref='dma_pre' :device.sync='dma_pre' :include-types='[deviceTypes[0]]'/>
                            </el-collapse-item>
                            <el-collapse-item title='' name='4'>
                                <template slot='title'>
                                    考核流量计（瞬时）<i class='el-icon-circle-plus-outline' @click.stop="openModal('dma_ins','4')"/> <span class='collapse-title-badge pull-right'>{{dma_ins.length}}</span>
                                </template>
                                <dma-device :type='deviceTypes[1]'  ref='dma_ins'    :device.sync='dma_ins' :include-types='[deviceTypes[1]]'/>
                            </el-collapse-item>
                            <el-collapse-item title='进水累计流量数据' name='5'>
                                <template slot='title'>
                                    进水累计流量数据 <i class='el-icon-circle-plus-outline' @click.stop="openModal('dma_in','5')"/><span class='collapse-title-badge  pull-right'>{{dma_in.length}}</span>
                                </template>
                                <dma-device :type='deviceTypes[2]' ref='dma_in'   :device.sync='dma_in' :include-types='[deviceTypes[2]]'/>
                            </el-collapse-item>
                            <el-collapse-item title='出水累计流量数据' name='6'>
                                <template slot='title'>
                                    出水累计流量数据 <i class='el-icon-circle-plus-outline' @click.stop="openModal('dma_out','6')"/><span class='collapse-title-badge pull-right'>{{dma_out.length}}</span>
                                </template>
                                <dma-device :type='deviceTypes[2]' ref='dma_out'  :device.sync='dma_out' :include-types='[deviceTypes[2]]'/>
                            </el-collapse-item>
                            <el-collapse-item title='收费大表' name='7'>
                                <template slot='title'>
                                    收费大表 <i class='el-icon-circle-plus-outline' @click.stop="openModal('dma_grp', '7')"/><span class='collapse-title-badge pull-right'>{{dma_grp.length}}</span>
                                </template>
                                <dma-device :type='deviceTypes[3]'  ref='dma_grp'  :device.sync='dma_grp' :include-types='[deviceTypes[3]]'/>
                            </el-collapse-item>
                        </el-collapse>
                        <el-row  type='flex' justify='center'>
                            <el-button size='mini' type='primary' @click='save()'>保存</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
        <el-dialog :visible.sync='showImgPreview' >
            <img width='100%' :src='dialogImageUrl' alt=''>
        </el-dialog>
    </el-row>
</template>

<script>
import dmaResource from '@/resource/dma';
import deviceModel from '@/components/common/DeviceModel';
import filters from '@/filters/index';
import {mixin, EDITE_STATE} from '@/mixin/dma';
import dmaDevice from './components/dmaDevice';

export default {
  name: 'DMAManage',
  mixins: [mixin],
  components: {
    deviceModel,
    dmaDevice
  },
  data () {
    return {
      treeEdit: true,
      activeNames: ['1', '2'],
      uploadData: {}, // 上传附带的参数
      currentImgs: []
    };
  },
  computed: {
  },
  methods: {
    handleImgsRemove (file) {
      console.log(file);
      let url = file.url;
      let index = this.currentImgs.findIndex(item => item.url === url);
      this.currentImgs.splice(index, 1);
    },
    handleImgsUplaodSuccess (uploadedUrl) {
      console.log(uploadedUrl);
      this.currentImgs.push({url: uploadedUrl});
    },
    beforeAvatarUpload () {

    },
    openModal (name, index) {
      this.activeNames = [...new Set(this.activeNames).add(index)];
      this.$refs[name].openDeviceModel();
    },
    save () {
      let vm = this;
      axios.all([vm.saveDmaData(), vm.updateDmaImgUrls()]).then(() => {
        vm.reload(vm);
      });
    },
    modifyDmaStatic () {
      let data = filters.plainObject(this.current);
      delete data.children;
      data.dmaSize = Number(data.dmaSize);
      return data;
    },
    updateDmaImgUrls () {
      return dmaResource.updateDmaImgUrls(this.current.dmaId, this.currentImgs.map(item => item.url).join(';'));
    },
    saveDmaData () {
      let relation = {};
      let vm = this;
      ['pre', 'ins', 'in', 'out', 'grp'].forEach(name => {
        if (vm[`dma_${name}`].length > 0) {
          relation[name] = vm[`dma_${name}`].map(item => item.deviceId).join(',');
        }
      });
      return dmaResource.saveDetail(this.modifyDmaStatic(), relation);
    },
    rename ({dmaId, dmaName}) {
      let vm = this;
      dmaResource.updateDmaName(dmaId, dmaName).then(() => {
        vm.reload(vm);
      });
    },
    appendDMA (data) {
      let parentId = data.dmaId;
      let option = this.getPlainLeaf();
      data.children = Array.isArray(data.children) ? data.children : [];
      option.mode = EDITE_STATE.ADD;
      option.parentId = parentId;
      console.log(option);
      data.children.unshift(option);
    },
    undo (data, node) {
      if (data.mode === EDITE_STATE.ADD) {
        data.mode = EDITE_STATE.NONE;
        node.parent.data.children.splice(0, 1);
      }
      if (data.mode === EDITE_STATE.EDIT) {
        data.dmaName = data._dmaName;
      }
      data.mode = EDITE_STATE.NONE;
    },
    addNode (parentId, dmaName) {
      let vm = this;
      dmaResource.addDmaNode({parentId: parentId, dmaName: dmaName}).then(() => {
        vm.$message({
          type: 'success',
          message: '添加成功!'
        });
        vm.reload(vm);
      });
    },
    removeTree (data) {
      let vm = this;
      this.$confirm('删除的dma, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        dmaResource.deleteDmaNodeByDmaId(data.dmaId).then(() => {
          vm.$message({
            type: 'success',
            message: '删除成功!'
          });
          vm.reload(vm);
        });
      });
    },
    saveNode (data) {
      console.log('保存');
      let vm = this;
      switch (data.mode) {
        case EDITE_STATE.ADD:
          this.$confirm('添加新的dma, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            vm.addNode(data.parentId, data.dmaName);
          }).catch(() => {
            data.mode = EDITE_STATE.NONE;
          });
          break;
        case EDITE_STATE.EDIT:
          this.$confirm('重命名dma, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            vm.rename(data);
          }).catch(() => {
            data.mode = EDITE_STATE.NONE;
          });
          break;
      }
    },
    nameHandle (event, data) {
      let value = event.currentTarget.value;
      if (data.mode === EDITE_STATE.NONE) {
        return;
      }
      if (data._dmaName === undefined) {
        data._dmaName = data.dmaName;
      }
      data.dmaName = value;
    },
  },
  mounted () {
    this.reload(this);
  }
};
</script>
<style lang='less'>
    @import '~assets/css/components-dir/dma';
</style>

