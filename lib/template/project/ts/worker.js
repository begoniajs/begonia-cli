module.exports = {
  entry(opt = {}) {
    return `/**
 * @description ${opt.title || ''}线程
 * @author ${opt.author} on ${new Date().toDateString()}
 */
//============================================================
// import
//============================================================
// function
//============================================================
const handler = {

};
//============================================================
/**
 * 监听消息
 */
worker.onMessage(function (req) {
  let type = req.type;
  let fn = handler[type];

  if (typeof fn === 'function') {
    let result = fn.call(null, req.data) || {
      isError: true,
      message: 'Can not get result',
      detail: \`Exec \${type} fn,but can't get result.\`
    };

    if (!result.isError) {
      result = { result };
    }
    worker.postMessage(result);

  } else {
    worker.postMessage({
      isError: true,
      message: 'Can not find a fn to handle',
      detail: \`The param named res's type==>\${req.type}\`
    });
  }
});

export default {};
`;
  }
};
