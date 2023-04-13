"use client";
//synthetic untuk gunakan e. pada typescript
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {

    const [modal,setModal] = useState(false)
    
    //untuk membuat loading hingga data berhasil tersimpan
    const [isMutating,setIsMutating] = useState(false)

    const router = useRouter()

    async function handleDelete(){
        setIsMutating(true)
        await fetch('http://localhost:5000/products',{
            method: 'DELETE',
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

        <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>

        <input type="checkbox" checked={modal} onChange={handleChange}  className="modal-toggle"/>

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-large">Are you sure to remove? </h3>
                
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!isMutating ? (
                            <button type="submit" className="btn btn-primary">Save</button>
                        ):(
                            <button type="button" className="btn loading">Saving...</button>
                        )}
                    </div>

            </div>
        </div>
    </div>
  )
}
