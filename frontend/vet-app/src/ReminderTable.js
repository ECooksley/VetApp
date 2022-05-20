import React from 'react';
import './Comments.css';


function ReminderTable(props) {
    return (
        <div className="table-container-scrollable">
            <table className="table is-fullwidth is-striped">
                <thead>
                    <tr>
                    {props.isEditable && props.permission >= 3 ? <th>Delete</th> : ''}
                        <th>Date</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>By</th>
                        <th>Notification Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.reminders.map((reminder, index) => {
                        const {treatmentId, prescribedDate, treatmentType, treatmentDescription, name, notifyDate } = reminder
                        return (
                            <tr key={index}>
                            {props.isEditable && props.permission >= 3 ? 
                                <td>
                                    <button onClick = {() => (props.toggleModal(), props.setDeleteId(treatmentId, index))} className='delete button is-danger '></button>
                                </td>
                            : ''}
                                <td>{prescribedDate}</td>
                                <td className='is-capitalized'>{treatmentType}</td>
                                <td>{treatmentDescription}</td>
                                <td>{name}</td>
                                <td>{notifyDate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ReminderTable;
