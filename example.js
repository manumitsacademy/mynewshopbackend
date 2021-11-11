const lodash = require("lodash");
var ar = [
{
	type:'mobile',
	name:'se23',	
},
{
	type:'ram',
	name:'dd3'
},
{
	type:'camera',
	name:'tty'
},
{
	type:'mobile',
	name:'oppo4'
},
{
	type:'mobile',
	name:'vivo'
},
{
	type:'camera',
	name:'sony'
},
]
var y = ['mobile','ram','camera'];
var groupByType={}
y.forEach((t)=>{
	var x = lodash.groupBy(ar,{type:t}).true;
	groupByType[t]=x;
})

console.log(groupByType);











