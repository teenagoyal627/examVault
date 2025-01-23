import axios from "axios"

export const approvedPaperHandler=(setShowModal,setModalContent) => {
    setShowModal(true)
    setModalContent({
        title: "Confirmation modal box",
        body: "Do you really approve the paper"
    })
}

export const rejectPaperHandler =(setShowModal, setModalContent,setComment,comment) => {
    setShowModal(true)
    setModalContent({
        title: "Rejection modal box",
        body:(
            <div>
                <p>Please Provide a reason for rejection:</p>
                <textarea 
                row="4"
                style={{width:"100%"}}
                placeholder="Enter your comment here..."
                onChange={(e)=>setComment(e.target.value)}
                />
            </div>
        )
    })
    console.log(comment)
}

export const approvedOrRejectPaper = async (paperId, modalContent, navigate,data,comment) => {
    console.log(comment)
    if (modalContent.title === "Confirmation modal box") {
        try {
            const apiUrl = 'http://localhost:5000/papers/update_paper_status'
            const response = await axios.put(apiUrl,
                { paperId, status: "Approved",approved_by:data.name}
            );
            console.log(response.data)
            navigate('/new_papers')
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            const apiUrl = 'http://localhost:5000/papers/update_paper_status'
            const response = await axios.put(apiUrl,
                { paperId, status: "Rejected", approved_by:data.name, comment:comment }
            );
            console.log(response.data)
            navigate('/new_papers')
        } catch (error) {
            console.log("Error has occurred....",error)
        }

    }
}