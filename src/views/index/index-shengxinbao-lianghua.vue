<template>
  <div class="shengxinbao-lianghua-box">
    <div class="shengxinbao-lianghua-title">
      <span class="title1">升薪宝量化</span>
      <span class="title2">分散投资    收益复投    灵活退出</span>
      <a class="seeMoreShengxinbaoLianghua" href="#">查看更多 <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></a>
    </div>
  </div>
</template>

<script>
  import { shengxinbao_lianghua } from '@/api';

  export default {
    name: 'shengxinbaoLianghua',
    data() {
      return {
        shengxinbaoLianghuaLiat: []
      }
    },
    methods: {
      shengxinbao_lianghua_list() {
        shengxinbao_lianghua().then(data => {
          console.log(data);
          for (let i = 0; i < data.data.data.quantizations.length; i++) {
            this.shengxinbaoLianghuaLiat.push(data.data.data.quantizations[i]);
          }
        })
      }
    },
    created() {
      this.shengxinbao_lianghua_list();
    }
  }
</script>

<style lang="scss" scoped>
  .shengxinbao-lianghua-box {
    width: 100%;
    height: 390px;
    box-sizing: border-box;

    .shengxinbao-lianghua-title {
      width: 100%;
      margin-bottom: 20px;

      .title1 {
        margin-right: 10px;
        font-size: 20px;
        color: #394b67;
      }

      .title2 {
        font-size: 14px;
        color: #7c86a2;
      }

      .seeMoreShengxinbaoLianghua {
        float: right;
        font-size: 14px;
        font-weight: 300;
        color: #727e90;

        i {
          vertical-align: -4%;
        }

        &:hover {
          color: #0671f0;
        }
      }
    }
  }
</style>
