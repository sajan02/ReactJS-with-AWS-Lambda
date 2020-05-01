import React from 'react';
import './index.scss';

const btnStyle = { borderColor: '#c13731', background: '#c13731', color: 'white' }

export default function Alert({ type, message, onConfirm, onYes, onCancel, secondaryContext, primaryContext}) {

    const { primaryText, secondaryText } = message;
    const getAlertButtons = () => {
        let el = null;
        if (type === 'confirmation') {
            el = <>
                <button type="button" onClick={onYes} className="btn btn-primary m-1">
                    {primaryText}
                </button>
                <button type="button" style={btnStyle} onClick={onCancel} className="btn m-1">
                    {secondaryText}
                </button>
            </>
        }
        else el = <button type="button" onClick={onConfirm}
            style={btnStyle} className="btn btn-primary btn-sm">
                {'Ok'}
            </button>
        return <div className='action-btn'>
            {el}
        </div>
    }

    return (
        <div className='alert-container'>
           <p className='alert-container__p'>{primaryContext}</p>
           {secondaryContext && <span className=''>{secondaryContext}</span>}
           {getAlertButtons()}
        </div>
    )
}
