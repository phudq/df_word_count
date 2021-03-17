var html = '<div>aaaaasdasdasdaaaaasdasd</div><div>- saasdasdasdasdasd </div><div>aasdasdsd</div><div>aasdaasdasdasdsdsd</div><div>asda</div><div>sd</div>'


var re = [];
const startRed = '<span class="red">'
const contentArray = html
  .split(/<div>|<\/div>/)
  .filter(e => !!e)



const {i1, i2} = find()

function replace() {

}
// .forEach(e => {
//   let value = e;
//   if ((count + e.length) >= maxCount) {
//     console.log(e);
//     const index = maxCount - count;
//     value = value.slice(0, index) + startRed + value.slice(index)
//   }
//   count += e.length
//   re.push(`<div>${value}</div>`)
// })
console.log(contentArray)
console.log(re.concat('</span>'))
