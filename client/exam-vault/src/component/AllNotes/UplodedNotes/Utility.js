export const editPaperHandler=(id,navigate)=>{
    navigate(`/upload_paper/${id}`)
}

export const viewHandler=async(id,navigate)=>{
     navigate(`${id}/view_paper`)

}