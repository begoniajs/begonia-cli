module.exports = {
  service(opt = {}) {
    return `/**
 * @description ${opt.title || ''}服务
 * @author ${opt.author} on ${new Date().toDateString()}
 */
// ============================================================
// import Log from 'bebark/log/LogManager';
// ============================================================

   `;
  },
  serviceData(opt = {}) {
    return `/**
 * @description ${opt.title || ''}数据接口
 * @author ${opt.author} on ${new Date().toDateString()}
 */
// ============================================================
// import Log from 'bebark/log/LogManager';
// import Request from 'bebark/http/Request';
// import WM from 'bebark/worker/WorkerManager';
// import LS from 'bebark/storage/StorageManager';
// import {} from 'befn';
// ============================================================
/**
 * @description 读取缓存数据
 * @param {} [optional]
 * @return {Promise<any>}
 */
function readData(data: any): Promise<any> {
  return Promise.resolve({ params: [] });
}
/**
 * @description 请求数据
 * @param {} [optional]
 * @return {Promise<any>}
 */
function requestData(data: any): Promise<any> {
  return Promise.resolve({ params: [] });
}
/**
 * @description 加工数据
 * @param {} [optional]
 * @return {Promise<any>}
 */
function processData(data: any): Promise<any> {
  return Promise.resolve({ params: [] });
}
/**
 * @description 存储并返回数据
 * @param {} [optional]
 * @return {Promise<any>}
 */
function saveData(data: any): Promise<any> {
  return Promise.resolve({});
}
// ============================================================
export default {
  readData,
  requestData,
  processData,
  saveData
};
   `;
  }
};
