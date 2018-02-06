import dma from '@/const/dma';
import filters from '@/filters/index';
import deviceOption from '@/const/device';
import dmaResource from '@/resource/dma';
import base from '@/mixin/base';
import commonLogic from '@/common/';
import mixins from '@/mixin/device';
import session from '@/utils/session';

const TYPES = ['pre', 'ins', 'in', 'out', 'grp'];
const EDITE_STATE = {
  NONE: 1,
  ADD: 2,
  EDIT: 3
};
const mixin = {
  mixins: [mixins, base],
  data () {
    return {
      showImgPreview: false,
      dialogImageUrl: '',
      TYPES: TYPES,
      deviceTypes: Object.keys(deviceOption.type),
      dmaTypeOptions: dma.dmaType,
      treeEdit: false,
      tree: [{}],
      current: {}, // 当前显示的静态属性
      defaultProps: {
        children: 'children',
        label: 'dmaName'
      },
      tempOpt: null,
      dma_pre: [],
      dma_in: [],
      dma_ins: [],
      dma_out: [],
      dma_grp: [],
    };
  },
  methods: {
    updateLocalDMA (dmaTree) {
      if (!dmaTree) {
        session.clear('dmaTree');
        dmaResource.getDMATree();
      } else {
        session.set('dmaTree', dmaTree);
      }
    },

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.showImgPreview = true;
    },
    getPlainLeaf () {
      return filters.plainObject(this.tempOpt);
    },
    async reload (vm) {
      let first;
      vm.updateLocalDMA();
      await dmaResource.getDMATree().then(({data}) => {
        data = [data];
        commonLogic.iterTree(data, (item) => {
          item.mode = EDITE_STATE.NONE;
        });
        if (!vm.getPlainLeaf()) {
          let tempOpt = filters.plainObject(vm.current);
          for (let p in tempOpt) {
            if (p === 'children') {
              tempOpt[p] = [];
            } else {
              tempOpt[p] = null;
            }
          }
          tempOpt.mode = EDITE_STATE.NONE;
          vm.tempOpt = tempOpt;
        }
        first = data[0];
        vm.tree = data;
      });
      return vm.getDetail(first);
    },
    getDetail (detail) {
      let vm = this;
      if (this.current.dmaId === detail.dmaId) {
        return false;
      }
      this.current = detail;
      this.$nextTick(() => {
        vm.$refs.tree.setCurrentKey(this.current.dmaId);
      });
      this.currentImgs = detail.dmaPicture.split(';').filter(item => !!item).map(item => { return {url: item} });
      return dmaResource.dmaRealtimeDataByDmaIds([detail.dmaId]).then(([data]) => {
        ['pre', 'ins', 'in', 'out', 'grp'].forEach(name => {
          let dmaName = `dma_${name}`;
          let list = filters.parsePath(`${detail.dmaId}.${name}`)(data) || [];
          vm[dmaName] = [];
          list.forEach(item => {
            let d = commonLogic.getDevById(item.deviceId);
            vm[dmaName].push(Object.assign(item, d));
          });
        });
        return data;
      });
    },
    /* eslint-disable */
    renderContent (h, { node, data, store }) {
      let isNotNone = !!(data.mode !== EDITE_STATE.NONE);
      let treeEdit = this.treeEdit;
      return (
        <span style='font-size: 14px;flex: 1;display: flex;align-items: center;justify-content: space-between;padding-right: 8px;'>
          <span>
            {data.mode !== EDITE_STATE.NONE?(
              <input autofocus={isNotNone}
                on-click={(e)=>{e.stopPropagation()}}
                on-focus={(e)=>{e.stopPropagation();this.nameHandle(e,data)}}
                on-input={(e)=>{this.nameHandle(e,data)}}
                autofocus={data.editName}
                placeholder='请输入名字'
                value={data.dmaName}
                v-model={data.dmaName}
              />
          ): (
            <span>{node.label}</span>
          )}
          <i on-click={(e)=>{e.stopPropagation();this.saveNode(data)}} class={isNotNone?'el-icon-check': 'el-icon-check hidden'}></i>
          <i on-click={ (e) => {e.stopPropagation();this.undo(data,node);} } class={isNotNone?'el-icon-close': 'el-icon-close hidden'}></i>
        </span>
        {treeEdit?
          (<span>
          <i class='el-icon-edit' on-click={(e) => {
            e.stopPropagation();
            let currentTarget = e.currentTarget;
            data.mode = EDITE_STATE.EDIT;
            this.$nextTick(()=>{
              currentTarget.parentElement.previousElementSibling.children[0].focus();
            });
          }}></i>
          <i class='el-icon-plus' on-click={(e) =>
            {
              let currentTarget = e.currentTarget;
              console.log(e.currentTarget,'e.currentTarget');
              e.stopPropagation();
              this.appendDMA(data);
              this.$nextTick(()=>{
                currentTarget.parentElement.parentElement.parentElement.nextElementSibling.querySelector('.el-tree-node: first-child input').focus();
              });
            }
          }></i>
          <i class='el-icon-delete' on-click={(e) => {e.stopPropagation();this.removeTree(data)} }></i>
          </span>): null}
        </span>
      );
    }
  }
  /* eslint-disable */
};
export {
  mixin,
  EDITE_STATE
}
