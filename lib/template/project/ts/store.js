module.exports = {
  branch(opt = {}) {
    return `/**
* @description ${opt.title || ''} state branch
* @author ${opt.author || 'developer'} on ${new Date().toDateString()} 
*/
//============================================================
// import Log from 'bebark/log/LogManager';
//============================================================
// reducer cmd const

//============================================================
export default {
  state: {

  },
  getters: {

  },
  actions: {

  },
  reducers: {
    
  }
};
`;
  },
  store(opt = {}) {
    return `/**
* @description ${opt.title || ''}
* @author ${opt.author || 'developer'} on ${new Date().toDateString()} 
*/
//============================================================
import BE from 'begonia';
import Bex from 'beleaf';
//============================================================
// import the state branch files here.
//============================================================
// install beleaf
BE.use(Bex);
// export store
export default Bex.createStore({
  debug: BE.debug,
  //===root state=========================================================
  // state: {},
  // getters: {},
  // actions: {},
  // reducers: {},
  //===branch state=========================================================
  // modules: {
    
  // }
});
`;
  }
};