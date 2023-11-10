import { useState } from "react"


import { useLocation ,Link, useNavigate} from "react-router-dom"

export default function Update() {

    //   var location = useLocation()
    //   var updateData = location.state?.data || {}  

   
    
    const location = useLocation();
    const navigate = useNavigate()
    
   console.log(location.state)

    var title = undefined
    var dis = undefined
    var val = undefined


    // const [data, mydata] = useState([])
    const [id, myid] = useState(1)




    // console.log(data)

    const updateSave = (e) => {

        e.preventDefault()

        var title1 = title.value
        var disc = dis.value
        var value1 = val.value

        console.log(title1, disc, value1)

        var ob = {id : location.state.id, title: title1, discription: disc, prior: value1 }
     

        fetch('/todo/update', {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ob)
        }).then(response => response.json()).then(res =>{
           if(res.msg == "Update successfull" ){
            navigate('/')
           }
        })


    }




    return (
        <>
            <div className="container" >
                <h2 className="alert alert-danger text-center" >Todo List Update</h2>


                <form onSubmit={(e) => updateSave(e)}>




                    <div className="row mt-4">

                        <div className="col-lg-6 col-md-6 col-sm-6">

                            <input type="text" ref={v => title = v} className="form-control" placeholder="Title" Value={location.state.title} required />

                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6">

                            <input type="text" ref={v => dis = v} className="form-control" placeholder="Discription" Value={location.state.discription} required />

                        </div>


                    </div>

                    <div className="row mt-3">

                        <div className="col-lg-6 col-md-6 col-sm-6">

                            <select ref={v => val = v} Value={location.state.prior} className="form-control" required>
                                <option >High</option>
                                <option >Medium</option>
                                <option >Low</option>


                            </select>

                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6">

                            <button  className="btn btn-success w-50"  >Update</button>

                        </div>


                    </div>

                </form>






            </div>
        </>
    )
}