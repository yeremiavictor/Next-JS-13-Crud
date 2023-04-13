"use client";
//synthetic untuk gunakan e. pada typescript
import { SyntheticEvent,useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
    id:number;
    title:string;
    price:number;
}

export default function UpdateProduct(product: Product) {
    const[title,setTitle] = useState(product.title)
    const[price, setPrice] = useState(product.price)

    const [modal,setModal] = useState(false)
    
    //untuk membuat loading hingga data berhasil tersimpan
    const [isMutating,setIsMutating] = useState(false)

    const router = useRouter()

    async function handleUpdate(e:SyntheticEvent){
        e.preventDefault();
        setIsMutating(true)
        await fetch(`http://localhost:5000/products/${product.id}`,{
            method: 'PATCH',
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

        <button className="btn btn-warning btn-sm" onClick={handleChange}>Edit</button>

        <input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-large">Edit {product.title}</h3>
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-fill input-bordered" placeholder="Nama"/>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input w-fill input-bordered" placeholder="Price"/>
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
