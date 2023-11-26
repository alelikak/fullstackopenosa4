const dummy = (blogs) => {
  var a=1
  return a
}
const totalLikes = (blogs) => {

  const sum = blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0,//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  )
  return sum
}


const favoriteBlog = (blogs) => {

  var suurinindeksi = blogs.reduce((iMax, x, i, arr) => x.likes > arr[iMax].likes ? i : iMax, 0)
  //https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array

  console.log(blogs[suurinindeksi])

  var k = JSON.parse(JSON.stringify( blogs[suurinindeksi], ['title','likes','author'] , 4))
  console.log(k)
  //https://stackoverflow.com/questions/16542529/how-to-change-the-order-of-the-fields-in-json

  return  k
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}