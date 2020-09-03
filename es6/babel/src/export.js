//export 导出 (一个一个的导出)
// export let a = 666;
// export let fn1 = () => 'hello world!!!';

let a = 666;
let fn1 = () => 'hello world!!!';
//解构赋值： 一起导出
export{ a, fn1 }

class Person {
    constructor(name) {
        this.name=name;
    }
    sleep() {
        console.log(this.name + ' is sleeping...');
    }
}

//一个文件中只能有一个export default，但可以有多个export
export default Person