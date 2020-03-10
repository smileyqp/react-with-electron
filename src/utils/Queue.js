    //基本队列
export default function Queue() {
    //初始化队列（使用数组实现）
    var items = [];

    this.init = function(arr){
        items = arr;
    }
    //向队列（尾部）中插入元素
    this.enqueue = function(element) {
        items.push(element);
    }

    //从队列（头部）中弹出一个元素，并返回该元素
    this.dequeue = function() {
        return items.shift();
    }

    //查看队列最前面的元素（数组中索引为0的元素）
    this.front = function() {
        return items[0];
    }

    //查看队列是否为空，如果为空，返回true；否则返回false
    this.isEmpty = function() {
        return items.length == 0;
    }

    //查看队列的长度
    this.size = function() {
        return items.length;
    }

    //查看队列
    this.print = function() {
        //以字符串形势返回
        return items.toString();
    }

    //清空队列
    this.clear = function() {
        //以字符串形势返回
        items = [];
        return items;
    }
    this.nextele = function(key){
        if(key == items.length - 1){
            return 0
        }else{
            return key+1
        }
    }
    this.frontele = function(key){
        if(key == 0){
            return items.length-1
        }else{
            return key-1
        }
    }
    this.curele = function(key){
         
        return key
    }
}