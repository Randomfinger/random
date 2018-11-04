/*

Eine Endlosschleife die randomstrings mit start und stopp markern produziert

*/
var R = require('./RandomJS')
var EL = require('../string/entferneLeer')
var self = {c:-1, start:'', stop:'0',body:['sa','so']}
var alph = `aäbcdefghijklmnoöpqrstuüvwxyz`
var num = `0123456789`
function loop(){
	self.c++
	self.start = 'SA', self.stop = 'SP'
	function evolve(arr){
		let parta = R(alph.split(''),'randomizedPartArr'),
		 partb = R((alph+num).split(''),'randomizedPartArr'),
		 ranLen = arr.length-R(arr.length)
		for (let i = 1; i <= ranLen; i++) { 
			arr[i] = R([ self.start, parta, ' '])+R([ self.stop, partb])
		}
		return arr
	}
	self.body = evolve(self.body)
	console.log('c: ', self.c, ', body: '+ EL(self.body.join('').replace(/SA/g,' ').replace(/SP/g,' ')) )
	setTimeout(loop, 300, self); 
}

loop()