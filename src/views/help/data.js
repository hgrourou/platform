export const request = [{
  feature: 'userId',
  comment: '客户ID'
}, {
  feature: 'userTag',
  comment: '客户对应的tag'
}, {
  feature: 'lastPtpDate',
  comment: '上次下P时间'
}, {
  feature: 'province',
  comment: '省份'
}, {
  feature: 'userMaxDefaultDays',
  comment: '逾期天数'
}, {
  feature: 'ownerId',
  comment: '所属ID'
}, {
  feature: 'curModule',
  comment: '所处模块'
}, {
  feature: 'curCompanyId',
  comment: '所处公司'
}, {
  feature: 'companyType',
  comment: '公司类型'
}, {
  feature: 'userOwingAmount',
  comment: '逾期金额'
}, {
  feature: 'modelTag',
  comment: '客户对应的modelTag'
}, {
  feature: 'companyAllotDate',
  comment: '公司分案时间'
}]

export const currentFunction = [{
  functionName: 'include(request,"")',
  effect: '包括，支持集合+单体'
}, {
  functionName: 'getMonthDay(request)',
  effect: '不输入参数：判断今天是几号'
}, {
  functionName: 'in("",request)',
  effect: '包括，支持集合+集合'
}, {
  functionName: 'diffDays(request,"")',
  effect: '只输入一个参数：离今天有多少天,输入两个参数：判断两天相距多少天'
}, {
  functionName: 'lastThirdNum(request)',
  effect: '最后三位数判断'
}, {
  functionName: 'getWeekDay(request)',
  effect: '不输入参数：判断今天是周几, 输入一个参数：判断参数日是周几'
}, {
  functionName: 'contains(request,"")',
  effect: '字符串包含,支持字符串单体+单体'
}]
	
export const supportFunction = [{
  functionName: 'sysdate()',
  effect: '返回当前日期对象java.util.Date'
}, {
  functionName: 'rand()',
  effect: '返回一个介于0-1的随机数，double类型'
}, {
  functionName: 'print([out],obj)',
  effect: '打印对象，如果指定out，向out打印，否则输出到控制台'
}, {
  functionName: 'println([out],obj)',
  effect: '与print类似，但是在输出后换行'
}, {
  functionName: 'now()',
  effect: '返回System.currentTimeMillis'
}, {
  functionName: 'string.contains(s1,s2)',
  effect: '判断s1是否包含s2，返回Boolean'
}, {
  functionName: 'string.length(s)',
  effect: '求字符串长度,返回Long'
}, {
  functionName: 'string.startsWith(s1,s2)',
  effect: 's1是否以s2开始，返回Boolean'
}, {
  functionName: 'string.endsWith(s1,s2)',
  effect: 's1是否以s2结尾,返回Boolean'
}, {
  functionName: 'string.substring(s,begin[,end])',
  effect: '截取字符串s，从begin到end，end如果忽略的话，将从begin到结尾，与java.util.String.substring一样。'
}, {
  functionName: 'math.abs(d)',
  effect: '求d的绝对值'
}, {
  functionName: 'math.sqrt(d)',
  effect: '求d的平方根'
}, {
  functionName: 'math.pow(d1,d2)',
  effect: '求d1的d2次方'
}, {
  functionName: 'math.log(d)',
  effect: '求d的自然对数'
}, {
  functionName: 'math.log10(d)',
  effect: '求d以10为底的对数'
}, {
  functionName: 'math.sin(d)',
  effect: '正弦函数'
}, {
  functionName: 'math.cos(d)',
  effect: '余弦函数'
}, {
  functionName: 'math.tan(d)',
  effect: '正切函数'
}, {
  functionName: 'map(seq,fun)',
  effect: '将函数fun作用到集合seq每个元素上，返回新元素组成的集合'
}, {
  functionName: 'filter(seq,predicate)',
  effect: '将谓词predicate作用在集合的每个元素上，返回谓词为true的元素组成的集合'
}, {
  functionName: 'count(seq)',
  effect: '返回集合大小'
}, {
  functionName: 'include(seq,element)',
  effect: '判断element是否在集合seq中，返回boolean值'
}, {
  functionName: 'sort(seq)',
  effect: '排序集合，仅对数组和List有效，返回排序后的新集合'
}, {
  functionName: 'reduce(seq,fun,init)',
  effect: 'fun接收两个参数，第一个是集合元素，第二个是累积的init，本函数用于将fun作用在集合每个元素和初始值上面，返回最终的init值'
}, {
  functionName: 'seq.eq(value)',
  effect: '返回一个谓词，用来判断传入的参数是否跟value相等,用于filter函数，如filter(seq,seq.eq(3)) 过滤返回等于3的元素组成的集合'
}, {
  functionName: 'seq.neq(value)',
  effect: '与seq.eq类似，返回判断不等于的谓词'
}, {
  functionName: 'seq.gt(value)',
  effect: '返回判断大于value的谓词'
}, {
  functionName: 'seq.ge(value)',
  effect: '返回判断大于等于value的谓词'
}, {
  functionName: 'seq.lt(value)',
  effect: '返回判断小于value的谓词'
}, {
  functionName: 'seq.le(value)',
  effect: '返回判断小于等于value的谓词'
}, {
  functionName: 'seq.nil()',
  effect: '返回判断是否为nil的谓词'
}, {
  functionName: 'seq.exists()',
  effect: '返回判断不为nil的谓词'
}]

export const supportOperationalCharacter = [{
  operationalCharacter: '() []',
  order: '从左到右',
  comment: '()用于函数调用，[ ]用于数组和java.util.List的元素访问，要求[indx]中的index必须为整型'
}, {
  operationalCharacter: '! -',
  order: '从右到左',
  comment: '! 能用于Boolean,- 仅能用于Number'
}, {
  operationalCharacter: '* / %',
  order: '从左到右',
  comment: 'Number之间'
}, {
  operationalCharacter: '+ -',
  order: '从左到右',
  comment: '+ - 都能用于Number之间, + 还能用于String之间，或者String和其他对象'
}, {
  operationalCharacter: '< <= > >=',
  order: '从左到右',
  comment: 'Number之间、String之间、Pattern之间、变量之间、其他类型与nil之间'
}, {
  operationalCharacter: '== != =~',
  order: '从左到右',
  comment: '==和!=作用于Number之间、String之间、Pattern之间、变量之间、其他类型与nil之间以及String和java.util.Date之间，=~仅能作用于String和Pattern之间'
}, {
  operationalCharacter: '&&',
  order: '从左到右',
  comment: 'Boolean之间，短路'
}, {
  operationalCharacter: '||',
  order: '从左到右',
  comment: 'Boolean之间，短路'
}, {
  operationalCharacter: '? :',
  order: '从右到左',
  comment: '第一个操作数的结果必须为Boolean，第二和第三操作数结果无限制'
}]

