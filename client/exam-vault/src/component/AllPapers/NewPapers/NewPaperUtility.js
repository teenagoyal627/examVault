import axios from "axios"

export const approvePaperHandler=(setShowModal,setModalContent) => {
    setShowModal(true)
    setModalContent({
        title: "Approve Paper Confirmation",
        body: "Are you sure you want to approve this paper? Once approved, it will be available to the student and others."
    })
}

export const rejectPaperHandler =(setShowModal, setModalContent,setComment,comment) => {
    setShowModal(true)
    setModalContent({
        title: "Provide Rejection Feedback",
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
}

export const approvedOrRejectPaper = async (paperId, modalContent, navigate,data,comment) => {
    if (modalContent.title === "Approve Paper Confirmation") {
        try {
            const apiUrl = 'http://localhost:5000/papers/update_paper_status'
            await axios.put(apiUrl,
                { paperId, status: "Approved",approved_by:data.name}
            );
            navigate('/new_papers')
        } catch (error) {
        }
    } else {
        try {
            const apiUrl = 'http://localhost:5000/papers/update_paper_status'
            const response = await axios.put(apiUrl,
                { paperId, status: "Rejected", approved_by:data.name, comment:comment }
            );
            navigate('/new_papers')
        } catch (error) {
            console.log("Error has occurred....",error)
        }

    }
}