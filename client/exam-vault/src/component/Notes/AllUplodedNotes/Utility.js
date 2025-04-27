export const editNotesHandler=(id,navigate)=>{
    navigate(`/upload_notes/${id}`)
}

export const viewHandler=async(id,navigate)=>{
     navigate(`${id}/view_notes`)

}