import fetch from 'sync-fetch'
import readlineSync from 'readline-sync'
// you can also use module 'node-fetch' if you prefer to do this asyncronously

// ==== Fetch data ==== 

console.log() // an empty line
var url = readlineSync.question('Paste the URL to the endpoint: ')
const json = fetch(url, {}).json()
const langtags = Object.values(json)
// console.info(typeof data) // object


// ==== Functions ==== 

// get the whole list of cApStAn codes
const getCapstanCodes = (data) => data.map(tagObj => tagObj.cApStAn)

// get language tag object (if it exists)
const getLangtagObj = (data, inputTag) => data.filter(obj => obj.cApStAn === inputTag)[0]

// corresponding tag in another convention 
const getCorrespondentTag = (data, inputTag, srcConv, tgtConv) => data.filter(obj => obj[srcConv] === inputTag )[0][tgtConv]

// all tag objects that have language subtag 'srb' (in cApStAn convention)
const getTagsWithLanguageSubtag = (data, subtag) => data.filter(obj => obj.cApStAn.startsWith(subtag + '-'))

// get all region subtags for a specific language subtag (in cApStAn convention)
const getRegionSubtagsForLanguage = (data, subtag) => getTagsWithLanguageSubtag(data, subtag).map(tagObj => tagObj.cApStAn.split('-')[1] )


// ==== Calls ====

const capstanCodes = getCapstanCodes(langtags)
const tagObj = getLangtagObj(langtags, 'glg-ESP')
const tag = getCorrespondentTag(langtags, 'glg-ESP', 'cApStAn', 'OmegaT')
const tagObjs = getTagsWithLanguageSubtag(langtags, 'srp')
const regionSubtags = getRegionSubtagsForLanguage(langtags, 'srp')


// ==== Output ====

// console.log(capstanCodes)
// console.log(tagObj)
// console.log(tag)
// console.log(tagObjs)
console.log(`Country tags language 'srp' combines with: ${regionSubtags}`)

console.log(`
Should you want to get some other output, please uncomment other lines in the Output section, or modify the code as you like.`)
