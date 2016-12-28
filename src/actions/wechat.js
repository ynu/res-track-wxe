export const SELECT_ENTERPRISE_CONTACT = 'wechat/SELECT_ENTERPRISE_CONTACT';

export const selectEnterpriseContact = result => ({
  type: SELECT_ENTERPRISE_CONTACT,
  result,
});

export const JSSDK_CONFIG = 'wechat/JSSDK_CONFIG';
export const JSSDK_READY = 'wechat/JSSDK_READY';

export const jssdkConfig = config => ({
  type: JSSDK_CONFIG,
  config,
});

export const jssdkReady = () => ({
  type: JSSDK_READY,
});
