<template>
  <div class="contract-page">
     <h4>协议编号: {{ loanId }}</h4>
     <button @click="contractDownload">合同下载</button>
     <div v-html="contractContent"></div>
  </div>
</template>

<script>
  import { param2Obj } from 'utils/index';
  import { fetchContractContent, fetchContractDownload } from 'api/contract';
  
  export default {
    data() {
      return {
        loanId: '',
        contractContent: ''
      }
    },
    methods: {
      getContractContent(id) {
        fetchContractContent(id).then(response => {
          if (response.data.meta.code === 200) {
            this.contractContent = response.data.data.contractContent;
          }
        })
      },
      contractDownload() {
        fetchContractDownload(this.loanId)
          .then(response => {
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
