import axios from "axios"

export const editPaperHandler=(id,navigate)=>{
    console.log("edit button is clicked")
    navigate(`/all_paper/upload_paper/${id}`)

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
        const apiUrl = 'http://localhost:5000/papers'
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

export const viewHandler=()=>{
    console.log("view button is clicked..")
}