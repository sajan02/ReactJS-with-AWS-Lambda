import React, { useState, useEffect } from 'react';
import './App.css';
import { UserTable } from './Component';
import { showFullScreenSpinner, showUserDetailsForm, showAlertModal, triggerCloseModal } from './Util/modalUtil';
import { postUserDetail, getAllUserDetail, putUserDetail, deleteUserDetail } from './service';

// Dummydata for reference
const dummyData = 
{
  "name": "Sajan Kashi",
  "updatedAt": "27/10/12",
  "status": "Pending",
  "email": "lsd@lputech.edu"
}


function App() {
  const [data, setstate] = useState([]);

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () => {
    let resp = await showFullScreenSpinner(async _ => await getAllUserDetail());
    setstate([...resp.list.sort((a,b) => { return new Date(b.updatedAt) - new Date(a.updatedAt)})]);
  }

  const onClickCreate = () => {
    showUserDetailsForm(async (userDetail) => {
      await showFullScreenSpinner(async (_) => await postUserDetail({...userDetail, updatedAt: new Date()}))
      fetchData();
    })
  }

  const onClickEdit = (user, index) => {
    showUserDetailsForm(async (userDetail) => {
      const { email, status, name, userId, updatedAt } = userDetail;
      let payload = { userId, updatedAt, body : { email, status, name }}
        try {
          await showFullScreenSpinner(async (_) => await putUserDetail(payload));
          fetchData();
        } catch (error) {
          console.log(error);
        }
    }, 'Save', 'User Details', {...user} )
  }

  const deleteAPICall = async (queryObject) => {
    triggerCloseModal();
    await showFullScreenSpinner(async _ => await deleteUserDetail(queryObject));
    fetchData();
  }

  const onClickDelete = (queryObject) => {
    showAlertModal({type: 'confirmation', title: 'Confirm', primaryText: 'Yes', secondaryText: 'No',
      primaryContext:'Are you sure you want to delete this entry. Please confirm.',
      onConfirm: deleteAPICall.bind(this,queryObject)
    })
  }

  return (
    <div className="App">
      <div className='container'>
        <div className="jumbotron" style={{ padding: '10px'}}>
          <h1 className="display-4">Demo v1</h1>
          <p className="lead">This is a simple ReactJS application to Demo the usecase with AWS API Gateway and AWS lambda functions </p>
          <hr className="my-4"/>
          <button className='btn btn-primary' onClick={onClickCreate}>{`Create User`}</button>
          </div>
        <UserTable data={data} onEdit={onClickEdit} onDelete={onClickDelete}/>
      </div>
    </div>
  );
}

export default App;
