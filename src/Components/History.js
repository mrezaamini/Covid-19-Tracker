import React, { useState } from 'react';
import "./History.css"

function History({onClearClick,historyData}) {/*history part in the left side that always list the history data (state that comes from app.js ) */
   
    return (
        <div className="historyPane">
            <h1>Search History</h1>
            <ul>
                {historyData.map((el, i)=>
                (
                    <li key={i}>
                            {el}
                    </li>
                )
                )}
            </ul>
            <button onClick={()=>onClearClick()}>Clear</button>
        </div>
    )
}

export default History;