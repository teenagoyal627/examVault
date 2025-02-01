import React from "react";
import classes from "./MyPaper/MyPaper.module.css";
const PaperTabular = ({ data, approvedBy }) => {
  const CreatedAtDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    });
  };

  return (
    <div>
      <table className={classes.paperTable}>
        <tbody>
          <tr>
            <td>
              <strong>Subject</strong>
            </td>
            <td>{data.subject}</td>
          </tr>
          <tr>
            <td>
              <strong>Year/Sem</strong>
            </td>
            <td>
              {data.year} Year {data.semester} Semester
            </td>
          </tr>

          <tr>
            <td>
              <strong>Department</strong>
            </td>
            <td>{data.department}</td>
          </tr>
          <tr>
            <td>
              <strong>Exam Type</strong>
            </td>
            <td>{data.exam_type}</td>
          </tr>
          <tr>
            <td>
              <strong>Paper Type</strong>
            </td>
            <td>{data.paper_type}</td>
          </tr>

          <tr>
            <td>
              <strong>Uploaded By</strong>
            </td>
            <td>{data.uploaded_by}</td>
          </tr>
          <tr>
            <td>
              <strong>Uploaded At</strong>
            </td>
            <td>{CreatedAtDate(data.created_at)}</td>
          </tr>
          <tr>
            <td>
              <strong>Status</strong>
            </td>
            <td
              className={
                data.paper_approval_status === "Pending"
                  ? classes.statusPending
                  : data.paper_approval_status === "Rejected"
                  ? classes.statusRejected
                  : data.paper_approval_status === "Approved"
                  ? classes.statusApproved
                  : ""
              }
            >
              {data.paper_approval_status}
            </td>
          </tr>
          {approvedBy &&
            (data.paper_approval_status === "Approved" ||
              data.paper_approval_status === "Rejected") && (
              <>
                <tr>
                  <td>
                    <strong>Approved By</strong>
                  </td>
                  <td>{data.approved_by}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Approved At</strong>
                  </td>
                  <td>{CreatedAtDate(data.approval_at)}</td>
                </tr>
              </>
            )}
          {approvedBy && data.paper_approval_status === "Rejected" && (
            <tr>
              <td>
                <strong>Comment</strong>
              </td>
              <td>{data.comment}</td>
            </tr>
          )}
          {
            data.download_count >0 &&(
          <tr>
            <td><strong>Download Count</strong></td>
            <td>{data.download_count}</td>
          </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default PaperTabular;
