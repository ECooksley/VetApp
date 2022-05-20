import React from 'react';
import './Comments.css';


function CommentTable(props) {
    return (
        <div className="table-container-scrollable">
            <table className="table is-fullwidth is-striped">
                <thead>
                    <tr>
                    {props.isEditable && props.permission >= 3 ? <th>Delete</th> : ''}
                        <th>Comment</th>
                        <th>By</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.comments.map((comment, index) => {
                        const {commentId, commentText, name, commentDate } = comment
                        return (
                            <tr key={commentId}>
                            {props.isEditable && props.permission >= 3? 
                                <td>
                                    <button onClick = {() => (props.toggleModal(), props.setDeleteId(commentId, index))} className=' delete button is-danger'></button>
                                </td>
                            : ''}
                                <td>{commentText}</td>
                                <td>{name}</td>
                                <td>{commentDate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CommentTable;
