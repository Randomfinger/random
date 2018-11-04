var moduleDescription = `Modul RandomJS: 
Dieses Modul soll Math.random() erweitern und aus dem übergebenen input einen Zufälligen Teil zurrück geben
Die einzelnen Funktionen (randomInt, randomArrEntry, randomObjEntry, randomString) sind auch mit param:subfunction aufrufbar.
`

var ti=process.argv.indexOf('test'), tmptest=0; if(ti!=-1){process.argv.splice(ti, 1); tmptest=1}
var _=require('underscore-node'), log=function(a){console.log(a)}, keylog=function(a){log('Keys: ');log(Object.keys(a))}
var m={}, defFun=function(str) {str.split(/[^A-Za-zÄÖÜäöü]/g).filter((x)=>{return x.length>3}).forEach((x)=>{ if(!m[x]){m[x]=(x)=>{return x}}else{m[x].refMe=m[x].refMe+1||1} })}(moduleDescription)

/*Rückgabe einer zufälligen ganzen Zahl, optional bis zu einem übergebenen Maximum*/
var randomInt = m.randomInt = function(max){
	var max = max || Number.MAX_SAFE_INTEGER
	return Math.floor(Math.random()*max)
}

/*Rückgabe eines zufälligen Eintrages von einem übergebenen Array (wenn Array oder Object suche tiefer)*/
var randomArrEntry = m.randomArrEntry = function(arr){
	var res
	if (Array.isArray(arr)) {
		res = arr[randomInt(arr.length)]
	}else{
		res = '!randomArrEntry kein Array übergebenen -> fehler'
	}

	if (Array.isArray(res)) {
		return randomArrEntry(res)
	}else if (typeof res == 'object') {
		return randomObjEntry(res)
	}
	return res
}

/*Rückgabe eines zufällig durchmischten arrays output.len = input.len*/
var randomizedFullArr = m.randomizedFullArr = function(arr){
	var res = []
	if (Array.isArray(arr)) {
		let reduced = arr.join('')
		for (let i = 0; i < arr.length; i++) {
			ranIndex = randomInt(reduced.length)
			res[i] = reduced.split('')[ranIndex]
			reduced = reduced.substr(0, ranIndex) + reduced.substr(ranIndex+1, reduced.length) 
			// res[i] = reduced[ranIndex]
			// reduced = 
		}
		return res
	}else{
		res = '!randomizedFullArr kein Array übergebenen -> fehler'
	}

	if (Array.isArray(res)) {
		return randomArrEntry(res)
	}else if (typeof res == 'object') {
		return randomObjEntry(res)
	}
	return res
}

/*Rückgabe eines zufällig durchmischten arrays output.len = input.len*/
var randomizedPartArr = m.randomizedPartArr = function(arr){
	var res = []
	if (Array.isArray(arr)) {
		let ranIndex = randomInt(arr.length)
		let ranLen = randomInt(arr.length - ranIndex)
		return randomizedFullArr(arr).join('').substr(ranIndex,ranLen)
	}else{
		res = '!randomizedPartArr kein Array übergebenen -> fehler'
	}

	if (Array.isArray(res)) {
		return randomArrEntry(res)
	}else if (typeof res == 'object') {
		return randomObjEntry(res)
	}
	return res
}

/*Rückgabe eines zufälligen Eintrages von einem übergebenen Objects (wenn Array oder Object suche tiefer)*/
var randomObjEntry = m.randomObjEntry = function(obj){
	var res
	if (typeof obj == 'object') {
		var keys = Object.keys(obj)
		res = obj[randomArrEntry(keys)]
	}else{
		res = '!randomObjEntry kein Object übergebenen -> fehler'
	}

	if (Array.isArray(res)) {
		return randomArrEntry(res)
	}else if (typeof res == 'object') {
		return randomObjEntry(res)
	}
	return res
}

/*Wenn ein übergebener String Leerzeichen enthält -> Rückgabe eines zufälligen Wortes
Wenn kein Leerzeichen enthalten -> Rückgabe eines zufälligen Buchstabens*/
var randomString = m.randomString = function(str){
	if (typeof str == 'string') {
		words = str.split(/\s/)
		if (words.length > 1) {
			return words[randomInt(words.length)]
		}else{
			return str[randomInt(str.length)]
		}
	}else{
		return '!randomString kein Object übergebenen -> fehler'
	}
}

var RandomJS = function(input, subfunction){
	if (subfunction) {
		return m[subfunction](input)
	}
  var res 
    if (typeof input == 'string') {
    	res = randomString(input)
    }else if (typeof input == 'number') {
    	res = randomInt(input)
    }else if (Array.isArray(input)) {
    	res = randomArrEntry(input)
    }else if (typeof input == 'object') {
    	res = randomObjEntry(input)
    }else{
    	res = '!unbekannter Typ in RandomJS'
    }
  return res
}

var test = function(){
	var testdaten=[
		0,100,0.1,
		'Zero',
		'Dies ist ein Beipielsatz.',
		[3,4,5],
		['Arc',3,{a:'b'}],
		{d:'c',e:'j',k:[8,9,['BBB',10,{k:['CCC',11,{l:'DDD'}]}]]}
	]
	.forEach((x)=>{
		  if (typeof x == 'string') {
		  		log('\nrandomString: '+randomString(x))
		  }else if (typeof x == 'number') {
		  		log('\nrandomInt: '+randomInt(x))
		  }else if (Array.isArray(x)) {
		  		log('\nrandomArrEntry: '+randomArrEntry(x))
		  }else if (typeof x == 'object') {
		  		log('\nrandomObjEntry: '+randomObjEntry(x))
		  }else{}
	})
}

module.exports = main = function(input, subfunction){
  if(ti!=-1||tmptest==1){
    log('\nmoduleDescription (Status: 1.0):');log(moduleDescription);log('\nTestergebnis:');tmptest=0
    return test()
  }else{
    return RandomJS(input, subfunction)
  }
}
module.exports.m=_.filter(m,(f)=>{return f.toString().length>15||Object.keys(f).length>0}); tmptest==1?main():0;