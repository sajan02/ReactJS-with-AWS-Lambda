import React, { useState } from 'react';
import './App.css';
import UserTable from './UserTable';
import moment from 'moment';
import { showFullScreenSpinner, showUserDetailsForm } from './Util/modalUtil';
import { postUserDetail } from './service';

// Dummydata for reference
const dummyData = 
{
  "name": "Sajan Kashi",
  "createdAt": moment(new Date()).format('LL'),
  "status": "Pending",
  "email": "lsd@lputech.edu"
}

function App() {
  const [data, setstate] = useState([]);

  const onClickCreate = () => {
    showUserDetailsForm(async (userDetail) => {
      let resp = await showFullScreenSpinner(async (_) => await postUserDetail(userDetail))
      if (resp && resp.data) setstate([...data, { ...resp.data,
        createdAt: resp.data.updatedAt && moment(resp.data.updatedAt).format('LL') }]);
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
        <UserTable data={data}/>
      </div>
    </div>
  );
}

export default App;
