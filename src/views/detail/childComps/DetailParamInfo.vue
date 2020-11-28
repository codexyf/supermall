<template>
  <div id="detail-param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table class="param-rule">
      <tbody>
        <tr
        v-for="(item, index) in paramInfo.sizes[0]"
        :key="index"
        v-if="item[1] !== '-'">
          <th>{{item[0]}}</th>
          <td v-for="(td_item,  td_index) in item.length - 1" :key="td_index">
            {{item[td_item]}}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="param-set">
      <tbody>
        <tr v-for="(item, index) in paramInfo.infos" :key="index">
          <th>{{item.key}}</th>
          <td>{{item.value}}</td>
        </tr>
      </tbody>
    </table>
    <div class="info-img" v-if="paramInfo.image !== ''">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name: "DetailParamInfo",
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>
<style scoped>
  #detail-param-info {
    font-size: 0.65rem;
    padding: 0.42rem 0.34rem;
    border-bottom: 0.3rem solid rgba(128, 128, 128, .2);
  }

  .param-rule,
  .param-set {
    border-bottom: 0.1rem solid rgba(128, 128, 128, .5);
    border-collapse: collapse;
    margin: 0 auto;
    margin-bottom: 0.42rem;
    width: 13.568rem;
  }

  .param-rule tr,
  .param-set tr {
    border-bottom: 0.04rem solid rgba(128, 128, 128, .5);
  }

  .param-rule th {
    text-align: left;
    padding-right: 1rem;
    word-spacing: nowrap;
  }

  .param-rule td {
    padding: 0.5rem;
  }

  .param-set th {
    text-align: left;
    padding: 0.5rem 3.5rem 0.5rem 0;
    word-spacing: nowrap;
  }

  .param-set td {
    color: var(--color-high-text);
  }

  .info-img img {
    width: 100%;
  }
</style>
