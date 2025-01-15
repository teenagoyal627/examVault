import axios from "axios"
const apiUrl = `${process.env.REACT_APP_APIURL}`

export const editPaperHandler=(id,navigate)=>{
    console.log("edit button is clicked")
    navigate(`/upload_paper/${id}`)

}

export const deleteHandler=(id,setModalContent,setShowModal,setPaperId)=>{
    setShowModal(true)
    setModalContent({
        title:"Confirmation",
        body:"Do you want to delete this paper."
    })
    setPaperId(id)
}
export const deletePaperHandler=async(id,setShowModal,modalContent,setPaperData)=>{
    if(modalContent.title==="Confirmation"){
        try{
            await axios.put(`${apiUrl}/${id}/delete`)
            setShowModal(false)
            setPaperData((prevPaper)=>
               prevPaper.filter((paper)=>paper._id!==id)
           )
        }catch(error){
            console.log(error)
        }
         
    }

}

export const viewHandler=async(id,navigate)=>{
    console.log("view button is clicked..")
     console.log(id)
     navigate(`${id}/view_paper`)

}