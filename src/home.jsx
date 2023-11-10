import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

import { Route, Router, Link, BrowserRouter } from "react-router-dom"
import Update from "./update"

export default function Home() {

  var title = undefined
  var dis = undefined
  var val = undefined


  const [tododata, mydata] = useState([])
  const [id, myid] = useState(1)

  const unique_id = uuid();




  console.log(tododata)

  const save = (e) => {

    e.preventDefault()

    var title1 = title.value
    var disc = dis.value
    var value1 = val.value

    console.log(title1, disc, value1)

    var ob = { title: title1, discription: disc, prior: value1 }
    mydata([...tododata, ob])



    fetch('/todo/save', {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ob)
    }).then(response => response.json()).then(res => console.log(res))


  }


  const tododelete = (id) => {
    console.log(id)

    var response = window.confirm('Are to want to delete?')


    if (response) {

      fetch('/todo/delete', {
        method: "delete",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })

      }).then(response => response.json()).then(res => {
        if (res.msg == 'Successfull Deleted') {
          mydata(tododata.filter((ob) => ob.id != id))
        }
      })

    }





  }




  useEffect(() => {

    fetch('/todo/list').then(response => response.json()).then(res => mydata(res.data))

  }, [])




  return (
    <>
      <div className="container" >
        <h2 className="alert alert-danger text-center" >Todo List</h2>


        <form onSubmit={(e) => save(e)}>




          <div className="row mt-4">

            <div className="col-lg-6 col-md-6 col-sm-6">

              <input type="text" ref={v => title = v} className="form-control" placeholder="Title" required />

            </div>

            <div className="col-lg-6 col-md-6 col-sm-6">

              <input type="text" ref={v => dis = v} className="form-control" placeholder="Discription" required />

            </div>


          </div>

          <div className="row mt-3">

            <div className="col-lg-6 col-md-6 col-sm-6">

              <select ref={v => val = v} className="form-control" required>
                <option >High</option>
                <option >Medium</option>
                <option >Low</option>


              </select>

            </div>

            <div className="col-lg-6 col-md-6 col-sm-6">

              <button className="btn btn-success w-50"  >Save</button>

            </div>


          </div>

        </form>



        <table className="table mt-5">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Title</th>
              <th>Discription</th>
              <th>Priority</th>
              <th>Operation</th>
            </tr>

          </thead>

          <tbody>
            {tododata.map((ob, i) => <tr>
              <td>{i + 1}</td>
              <td>{ob.title}</td>
              <td>{ob.discription}</td>
              <td>{ob.prior}</td>
              <td><button className="btn btn-danger" onClick={(d) => tododelete(ob.id)}  >Delete</button>
                &nbsp; <Link to='/Update' state={ob} ><button className="btn btn-warning"  >Update</button></Link></td>
            </tr>)}

          </tbody>
        </table>




      </div>



    
    </>

    
  )
}