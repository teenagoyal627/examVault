import axios from "axios"
const apiUrl = `${process.env.REACT_APP_APIURL}`

export const editNotesHandler=(id,navigate)=>{
    navigate(`/upload_notes/${id}`)
}

export const deleteHandler=(id,setModalContent,setShowModal,setPaperId)=>{
    setShowModal(true)
    setModalContent({
        title:"Confirmation",
        body:"Do you want to delete this notes."
    })
    setPaperId(id)
}

export const deleteNotesHandler=async(id,setShowModal,modalContent,setPaperData)=>{
    if(modalContent.title==="Confirmation"){
        try{
            await axios.put(`${apiUrl}/notes/${id}/delete`)
            setShowModal(false)
            setPaperData(prevnotes=>
               prevnotes.filter((notes)=>notes._id!==id)
           )
        }catch(error){
            console.log(error)
        }
         
    }

}

export const viewHandler=async(id,navigate)=>{
     navigate(`${id}/view_notes`)

}