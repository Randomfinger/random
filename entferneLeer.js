var moduleDescription = `Modul entferneLeer: 
Entferne Leerzeilen. 
Nomalisiere Zellen die nur Leerzeichen enthalten zu Zellen die einen leeren String enthalten.
ToDo: ergänze um strings wie "§$"¬{[`

var ti=process.argv.indexOf('test'), tmptest=0; if(ti!=-1){process.argv.splice(ti, 1); tmptest=1}
var _=require('underscore-node'), log=function(a){console.log(a)}, keylog=function(a){log('Keys: ');log(Object.keys(a))}
var m={}, defFun=function(str) {str.split(/[^A-Za-zÄÖÜäöü]/g).filter((x)=>{return x.length>3}).forEach((x)=>{ if(!m[x]){m[x]=(x)=>{return x}}else{m[x].refMe=m[x].refMe+1||1} })}(moduleDescription)
var kapselArray = require('../codeBsp/kapselArray.js')
var searchAndDestroy=function(str) {
  if (typeof str == 'string') {
  str=str.replace(/[\s\uFEFF\xA0]+/g,' ') //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  	// log('str replaced leer Bereich(e): '+str)
	return str
  }else{
  	log('\nFehler entferneLeer: falscher typ')
  	log('str type of : '+typeof str+', IsArray: '+Array.isArray(str))
    if (str) {
  	 log('Inhalt length: '+str.length+'\n')
    };
	return str
  }
}




var entferneLeer = function(input){
  var res=[]
    if (typeof input == 'string') {
      return searchAndDestroy(input)
    }else if (typeof input == 'number') {
      return input
    }else if (Array.isArray(input)) {
    	// log('starte entferneLeer für arr')
    	res = kapselArray(input, searchAndDestroy)
    }else if (typeof input == 'object') {
    }else{}
  return res
}

var test = function(){
  var testdaten=['sdg s sdfs df sd            sdfsdfs function       ksjdhi ','["§$    l','aSDF/&Sdf/SDf67SKJ EE876(/&(9']; 
log(entferneLeer('lasdf   sdfa'))
return entferneLeer(testdaten)
}

module.exports = main = function(input){
  if(ti!=-1||tmptest==1){
    log('\nmoduleDescription (Status: Test):');log(moduleDescription);log('\nTestergebnis:');tmptest=0
    // return test()
    log(test())
  }else{
    return entferneLeer(input)
  }
}
module.exports.m=_.filter(m,(f)=>{return f.toString().length>15||Object.keys(f).length>0}); tmptest==1?main():0;
// log(main())