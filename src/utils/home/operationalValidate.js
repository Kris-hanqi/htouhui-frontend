import store from '@/store';
import Router from '../../router/home';
import { MessageBox } from 'element-ui'

const stepsData = {
  openAccount: {
    title: '开户',
    storeName: 'isOpenAccount',
    url: '/accountManage/set/openAccount'
  },
  transactionPassword: {
    title: '设置交易密码',
    storeName: 'isTransactionPassword',
    url: '/accountManage/set/transactionPassword'
  },
  bankCard: {
    title: '绑卡',
    storeName: 'isBankCard',
    url: '/accountManage/set/bindBackCard'
  },
  automaticTender: {
    title: '自动投标授权',
    storeName: 'isAutomaticBidding',
    url: '/accountManage/set/index'
  },
  automaticDebtTransfer: {
    title: '自动债权转让授权',
    storeName: 'isAutomaticDebtTransfer',
    url: '/accountManage/set/index'
  },
  automaticRepayment: {
    title: '自动还款授权',
    storeName: 'isAutomaticRepayment',
    url: '/accountManage/set/index'
  }
};

export default function(stepsList) {
  let stepData = null;
  for (let i = 0; i < stepsList.length; i++) {
    const value = stepsList[i];
    stepData = stepsData[value];
    const status = store.getters[stepData.storeName];

    if (status === true) {
      stepData = null;
    } else {
      break;
    }
  }

  if (stepData) {
    // 获取需要设置的步骤
    MessageBox.alert('尚未' + stepData.title, '提示', {
      confirmButtonText: '确认',
      type: 'warning',
      callback: action => {
        if (action === 'confirm') {
          Router.push(stepData.url);
        }
      }
    });
    return false;
  } else {
    return true;
  }
}
