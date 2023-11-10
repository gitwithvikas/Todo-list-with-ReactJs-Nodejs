
const express = require('express')

const router = express.Router()

const Db = require('../DB/Dbconnection')

router.post('/save',(req,res)=>{
    const data = req.body
    console.log(data)
    Db.query('insert into todo (title,discription,prior) values (?,?,? ) ',[data.title,data.discription,data.prior],(err,done)=>{
        if(err){
            return res.json({err})
        }
        else{
            return res.json({msg :'saved successfull'})
        }
    })

})


router.get('/list',(req,res)=>{

    console.log('inside list')
    Db.query('select * from todo',(err,data)=>{
        if(err){
            return res.json({err})
        }
        else{
            return res.json({data:data})
        }
    })
})

router.delete('/delete',(req,res)=>{
    console.log(req.body)
    const id = req.body.id
    Db.query('delete from todo where id = ?',[id],(err,result)=>{
        if(err){
            return res.json({err})
        }
        else{
            return res.json({msg:'Successfull Deleted'})
        }
    })
})


router.put('/update',(req,res)=>{
    const data = req.body
    console.log(data)
    Db.query('update todo set title = ?, discription = ?, prior = ? where id = ?',[data.title,data.discription,data.prior,data.id],(err,done)=>{
        if(err){
            return res.json({err})
        }
        else{
            return res.json({msg :'Update successfull'})
        }
    })

})

module.exports = router