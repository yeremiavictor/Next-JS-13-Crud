"use client";
import { SyntheticEvent,useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const[title,setTitle] = useState("")
    const[price, setPrice] = useState("")

    const [modal,setModal] = useState(false)

    const router = useRouter()

    async function handleSubmit(e:SyntheticEvent){
        e.preventDefault();
        await fetch('http://localhost:5000/products',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title:title,
                price:price,
            })
        })

        setTitle("")
        setPrice("")
        router.refresh()
        setModal(false)
    }

    function handleChange(){
        setModal(!modal)
    }

  return (
    <div>

        <button className="btn" onClick={handleChange}>Add New</button>

        <input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-large">Add Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-fill input-bordered" placeholder="Nama"/>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-fill input-bordered" placeholder="Price"/>
                    </div>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
