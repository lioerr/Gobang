export default (obj: any) => {
    const type = typeof obj;
    if (type == "string" && new Date(obj).toString() !== 'Invalid Date') {
      return 'Date';
    }
    // 可以通过Object.prototype.toString方法，判断某个对象之属于哪种内置类型。 "[object Null]"
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
  }

    // String
    // Date
    // Number
    // Boolean
    // Array
    // Object