import React, { useState } from 'react';
import "./ReportType.css"
/*handle radio selection box */
function ReportType({onReportSelect, reportType}) {
    
    const handleIn = (e) => {
    
        onReportSelect(e.target.value);
    }
    return (
        <div className="rtForm">
            {/* a form that every time checks one of the radio select and send what we have to do based on this to app.js */}
            <form> 
                <label className="rtLabel">Today Cases
                    <input type="radio"
                        value="todayCases"
                        checked={reportType === "todayCases"}
                        onChange={handleIn}
                    />
                </label>
                <label className="rtLabel">Today Deaths
                    <input type="radio"
                        value="todayDeaths"
                        checked={reportType === "todayDeaths"}
                        onChange={handleIn}
                    />
                </label >
                <label className="rtLabel">Today Recovereds
                    <input type="radio"
                        value="recovered"
                        checked={reportType === "recovered"}
                        onChange={handleIn}
                    />
                </label>
            </form>
        </div>
    )
}

export default ReportType;