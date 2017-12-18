<template>
  <div class="contract-page">
     <h4>协议编号: {{ loanId }}</h4>
     <button @click="contractDownload" :disabled="showPrompt">下载合同</button>
     <div style="text-align: center;" v-if="showPrompt">数据请求中，请稍后...</div>
     <div v-else="" v-html="contractContent"></div>
  </div>
</template>

<script>
  import { param2Obj } from 'utils/index';
  import fileSaver from 'file-saver';
  import { fetchContractContent, fetchContractDownload } from 'api/contract';
  
  export default {
    data() {
      return {
        loanId: '',
        showPrompt: true,
        contractContent: ''
      }
    },
    methods: {
      getContractContent(id) {
        fetchContractContent(id).then(response => {
          if (response.data.meta.code === 200) {
            this.showPrompt = false;
            this.contractContent = response.data.data.contractContent;
          }
        })
      },
      contractDownload() {
        fetchContractDownload(this.loanId)
          .then(response => {
            fileSaver.saveAs(response.data, '海投汇-合同.pdf');
            console.log(response);
          })
      }
    },
    created() {
      const queryData = param2Obj(window.location.href);
      if (queryData.loanId) {
        this.loanId = queryData.loanId;
        this.getContractContent(queryData.loanId);
      }
    }
  }
</script>
