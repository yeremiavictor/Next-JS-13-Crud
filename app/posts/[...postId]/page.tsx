export default function PostDetail({params}:{params:{postId: string}}) {
  return (
    <div>Post {params.postId[0]}</div>
    // kita dapat menampilkan index saja dengan memasukan array
    // contoh {params.postId[0]}
  )
}
