## account App
- 基于`create-react-app`创建的应用

#### note
- 可以通过引用`"prop-types`包来设置`props`传的值的类型和必需。
```
import PropTypes from "prop-types";

Record.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
}
```
---
- 在react中使用箭头函数如果函数的代码块多于一条语句，就要使用花括号将它们包裹起来，并使用return语句返回。
    由于大括号会被解析成代码块，如果箭头函数直接返回一个对象，那个必须加上小括号，否则会报错。
```
// 报错
const fun = (id,name) => { id: id, name: name }

// 不报错
const fun = (id,name) => ({ id: id, name: name })
```
---
- [数组的Reduce()的相关知识](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

**计算一个对象数组里的值**
- 需要传递一个初始的值，否则会出错。实例可看`/src/components/Records.js`
```
var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(
    (accumulator, currentValue) => accumulator + currentValue.x
    ,initialValue
);

console.log(sum) // 6
```
---

- `json-server`
- - `json-server --watch ${json文件名} --port ${端口号}`
---# accounts-app
