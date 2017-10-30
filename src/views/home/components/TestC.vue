<template>
  <form action="https://test.credit2go.cn/escrow/p2p/page/trusteePay" method="post" id="frm1" style="display:none;">
    <input type="text" name="receiptAccountId" value="6212461430000103735">
    <input type="text" name="idNo" value="120111195209072983">
    <input type="text" name="idType" value="01">
    <input type="text" name="acqRes" value="htouhui">
    <input type="text" name="accountId" value="6212461430000453700">
    <input type="text" name="txDate" value="20170406">
    <input type="text" name="version" value="10">
    <input type="text" name="bankCode" value="30050000">
    <input type="text" name="productId" value="stage7">
    <input type="text" name="sign" value="a7jQn/DZ5AFkkOv/U5vSn2B0THTMU4LPoC4EBv9a3u4sCGG7w2IF5Gr5h3SfkIZFrxT9AsNbu3e6fEcPDORpPW6eB5Hsy5YX/OaCakh+Rtxvl5b6VDIOUrweiMsSFpuVL9T1PiztWu6j5dPeDOUo+asWuvFFcrUhBwjeBsk3IVw8YXjiHhbdUyT0FmOk2bW9FBDOOYnCf+TNvjZtE3qpMChoQ2UWXx3WJNRzhtOr1U3p/wwL5XrLZ0qVopX8Vsd3TxalrJRdayACU3S/lqhUsJZze7KbIJgomFI/kkHM8C6qME4ZJC2nSYK88H9il/yVB9oH6DtS3IDjyY3TKuP8OQ==">' +
    <input type="text" name="txTime" value="155231">
    <input type="text" name="txCode" value="trusteePay">
    <input type="text" name="retUrl" value="http://127.0.0.1:8080/htouhui/jixin_return_web/">
    <input type="text" name="notifyUrl" value="http://127.0.0.1:8080/htouhui/jixin_return_s2s/">
    <input type="text" name="channel" value="000002">
    <input type="text" name="instCode" value="00300001">
    <input type="text" name="forgotPwdUrl" value="">
  </form>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      test11() {
        console.log(123);
        document.getElementById('frm1').submit();
      }
    }
  }
</script>
