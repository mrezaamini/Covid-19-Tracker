import react from 'react';
import loading from '../Loading.gif';
import './Loading.css';


function Loading() { /*loading gif to be displayed whenever something is fetchin and we going in loading state (that is declared bu Loading in app.js) */
    return (
        <div className="gifContainer">
            <img src={loading} />
        </div>
    )
}

export default Loading;