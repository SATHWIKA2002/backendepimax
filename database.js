const mysql=require('mysql');

const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'epimax'
})
con.connect((err)=>{
    if (err) throw err;
    console.log('My sql is connected')

})
con.query('SELECT * FROM users',(error,result)=>{
    if (error) throw error;
    console.log(result)
})