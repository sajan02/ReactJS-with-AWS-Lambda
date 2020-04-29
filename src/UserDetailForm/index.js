import React, { useState, useEffect } from 'react';
import './index.css';
import { triggerCloseModal } from '../Util/modalUtil';

export default function UserDetailForm(props) {

    const initialState = { name: '', status: '', email: ''};
    const [state, setState] = useState(initialState)
    const fields = [
        {
            name: "name",
            value: state.name,
            placeholder: 'Name'
        },
        {
            name: "status",
            value: state.status,
            placeholder: 'Pending'
        },
        {
            name: "email",
            value: state.email,
            placeholder: 'xyz@demo.com'
        }
    ]

    // WillReceiveProps
    useEffect(() => {
        setState({...props.userDetails})
    }, [props])

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    }
    const submitDetail = async () => {
        triggerCloseModal();
        props.callback && await props.callback({ ...state, updatedAt: new Date() });
    }
    return (
        <div className='container'>
            <form>
                <div className="row">
                    {fields
                        .map(field => 
                        <div className="col">
                            <input type="text" className="form-control"
                                placeholder={field.placeholder}
                                name={field.name}
                                value={field.value}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                </div>
                <div className='action-btns'>
                    <button className='btn btn-primary'
                    onClick={submitDetail}>{props.mode}</button>
                </div>
            </form>
        </div>
    )
}
