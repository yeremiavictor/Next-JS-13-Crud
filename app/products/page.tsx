type Product = {
    id:number;
    title:string;
    price:number;
}

async function getProducts(){
    // ini adalah static (perlu refresh untuk update data)
    const res = await fetch('http://localhost:5000/products')
    return res.json()
}

export default async function ProductList() {
    const products: Product[] = await getProducts();
  return (
    <div className="py-10 px-10">
        <table className="table w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>price</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {products.map((product, index) =>(
                    <tr key={product.id}>
                        <td>{index +1}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                    </tr>
                ))}

            </tbody>
            
        </table>
    </div>
  )
}
