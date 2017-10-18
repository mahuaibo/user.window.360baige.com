import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  publicParameters: {
    path: 'http://dev.cloud.360baige.com/cloud/window/schoolFee/v1',
    loginModel: false,
    headType: 0
  },
  schoolFeeData: {
    list: [{
      createTime: 0,
      logo: '',
      type: '1',
      name: '223232',
      pname: '2',
      status: '1',
      address: 'sdsds'
    }],
    pageData: {
      pageSize: 50,
      current: 1,
      total: 1
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
