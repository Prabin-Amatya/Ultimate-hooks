const app = require('./app')

const PORT = 3001 || process.env.PORT
app.listen(PORT, () => console.log(`Server connected to port ${PORT}`))