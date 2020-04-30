import React from 'react';
import './index.css';

/**
 * 
 * @param {object} props - { data : {array} } Array of users
 */

export default function UserTable(props) {
    const { data, onEdit, onDelete} = props;
    const getTableRow = (data, index) =>
        <tr key={`tr-${index}`}>
            <td scope="row">{index+1}</td>
            <td>{data.name}</td>
            <td>{data.createdAt}</td>
            <td>{data.status}</td>
            <td>{data.email}</td>
            <td>
              <button className='btn btn-primary m-1' onClick={async _ => {
                  if (onEdit) {
                    await onEdit(index);
                  }
              }}>Edit</button>
              <button className='btn btn-danger m-1' onClick={async _ => {
                  if (onDelete) {
                    await onDelete(index);
                  }
              }}>Delete</button>
            </td>
        </tr>;

    return (
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Created</th>
                  <th scope="col">Status</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
            </thead>
          <tbody>
            {data && Array.isArray(data) &&
                data.map((datum,index) => getTableRow(datum, index))}
          </tbody>
        </table>
    )
}
