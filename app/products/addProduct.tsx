"use client";
//synthetic untuk gunakan e. pada typescript
import { SyntheticEvent,useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const[title,setTitle] = useState("")
    const[price, setPrice] = useState("")

    const [modal,setModal] = useState(false)
    
    //untuk membuat loading hingga data berhasil tersimpan
    const [isMutating,setIsMutating] = useState(false)

    const router = useRouter()

    async function handleSubmit(e:SyntheticEvent){
        e.preventDefault();
        setIsMutating(true)
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
        // mematikan loading save
        setIsMutating(false)
        setTitle("")
        setPrice("")

        // refresh page 
        router.refresh()

        // close create new page
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
                        {!isMutating ? (
                            <button type="submit" className="btn btn-primary">Save</button>
                        ):(
                            <button type="button" className="btn loading">Saving...</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
