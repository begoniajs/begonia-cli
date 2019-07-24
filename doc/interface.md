
## 基础

### 协议

```js
{
  socketId: 13131312, // 客户端id
  from: '1', // 0 错误 1 客户端  2 服务端 
  type: '', // 接口
  data: {}, // 发送数据
  state: 200, // 状态码
}
```

## 接口

### 获取项目列表

#### request数据结构

```js
{

}
```

#### response数据结构

```js
{
  resCode: 200,
  data: [
    {
      id: '', // 项目id
      name: '', // 项目名称
      pic: '', // 项目图片
      projectDir: '', // 项目在本机的路径
      pathValidate: 1 // 路径是否有效, 0 无效, 1 有效
    }
  ]
}
```

---

### 新建项目

#### request数据结构

```js
{
  name: '',
  projectDir: '',
  platforms: ['wx'], // wx, ant, baidu, toutiao
  script: 'js', // js, ts
  css: 'css', // css, scss, sass, less, wxss, ...
  view: 'html', // html, wxml, ...
  singleMode: 1, // 单文件模式
  frameworkes: ['begonia', 'beleaf', ...], // 需要使用的begoina库
  members: ['someOne'], // 开发者名称集合
}
```

#### response数据结构

```js
{
  resCode: 200,
  {
    name: '', // 项目名称
    projectDir: '', // 项目目录
    id: '', // 项目id
  }
}
```

---

### 导入工程

#### request数据结构

```js
{
  projectDir: ''
}
```

#### response数据结构

```js
{
  id: '', // 项目id
  name: '', // 项目名称,
  projectDir: '', // 项目所在目录
}
```

---

### 获取工程目录结构

#### request数据结构

```js
{
  id: '', // 项目Id
  projectDir: '' // 项目所在目录
}
```

#### response数据结构

```js
{
  resCode: 200,
  data: {
    top: 'sfsfsfsfwv-sfafefwwfwf', // 顶层目录的id
    nodes: {
      'sfsfsfsfwv-sfafefwwfwf': {
        id: 'sfsfsfsfwv-sfafefwwfwf', // 节点id
        type: 'dir', // 目录
        name: '', // 目录名称
        link: '', // 目录地址
        children: ['asfwnwofnw-safownwan'], // 子目录和子文件，如果数组不为空，证明已被请求过。如果数组为空，表明需要请求才可获取其中的子文件和子目录节点对象 
      },
      'asfwnwofnw-safownwan': {
        id: 'asfwnwofnw-safownwan',
        type: 'file', // 文件
        ext: '', // 文件类型扩展名, file特有
        extIcon: '', // 文件类型图标，file特有
        name: '', // 文件名称
        link: '', // 文件目录
      }
    }
  },
}
```

--- 

### 获取某个文件夹中的文件列表

#### request数据结构

```js
{
  id: '', // 项目的id,
  nodeId: '', // 节点的id
  link: '', // 节点的地址
}
```

#### response数据结构

```js
resCode: 200,
  data: {
    top: 'sfsfsfsfwv-sfafefwwfwf', // 顶层目录的id
    nodes: {
      'sfsfsfsfwv-sfafefwwfwf': {
        id: 'sfsfsfsfwv-sfafefwwfwf', // 节点id
        type: 'dir', // 目录
        name: '', // 目录名称
        link: '', // 目录地址
        children: ['asfwnwofnw-safownwan'], // 子目录和子文件，如果数组不为空，证明已被请求过。如果数组为空，表明需要请求才可获取其中的子文件和子目录节点对象 
      },
      'asfwnwofnw-safownwan': {
        id: 'asfwnwofnw-safownwan',
        type: 'file', // 文件
        ext: '', // 文件类型扩展名, file特有
        extIcon: '', // 文件类型图标，file特有
        name: '', // 文件名称
        link: '', // 文件目录
      }
    }
  },
```

---

### 创建页面文件

#### request数据结构

```js
{}
```

#### response数据结构

```js
{
  resCode: 200
}
```
