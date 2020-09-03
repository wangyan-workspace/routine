//import: 引入 要用{}包起来引入的对象名
//as:给a起一个别名
import {a as aaa,fn1 } from './export';
console.log(aaa);

console.log(fn1());

import Person1 from './export';

let p1 = new Person1('wangwu');
p1.sleep();