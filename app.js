// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurList.results })
})

app.get('/restaurants/:restaur_id', (req, res) => {
  const restaurant = restaurList.results.find(restaur => restaur.id.toString() === req.params.restaur_id)
  res.render('show', { restaurant: restaurant })
})

// routes setting
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase() // 利用trim將空白剔除以及將字母轉換為小寫
  const restaurants = restaurList.results.filter(restaurant => {
    return searchKeyword(restaurant.name, keyword) || searchKeyword(restaurant.category, keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

// 宣告搜尋關鍵字函式
function searchKeyword(isSearchedItem, keyword) {
  return isSearchedItem.toLowerCase().includes(keyword)
}