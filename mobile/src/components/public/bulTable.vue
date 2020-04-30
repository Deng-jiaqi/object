<template>
  <el-table
      :data="listData"
      style="width: 100%"
      :cell-style="cellStyle"
      row-key="attrpid"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      default-expand-all
      border
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :header-row-class-name="headerClass"
      fit>
    <el-table-column
        v-for="(item, index) in listLabel"
        :key="index"
        :prop="item.prop"
        :label="item.label">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    listData: {
      default: [],
      type: Array
    },
    listLabel: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  name: 'san-table',
  methods: {
    // 表格头部样式
    headerClass () {
      return 'table-header-class'
    },
    // element列表文字居中
    cellStyle () {
      return 'text-align:center;line-height: 8px;'
    }
  }
}
</script>

<style scoped>

</style>
