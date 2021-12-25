import React, { useState, useEffect } from 'react';
import './CountryDataView.css'


function CountryDataView({ countryData }) { /*used for showing recieved data of a country based on what we fetched in app.js and pass as country data to it */
    const [countryDataInfo, setCountryDataInfo] = useState({ /*default value for a country */
        country: "",
        todayCases: "",
        critical: "",
        todayRecovered: "",
        todayDeaths: ""
    })

    useEffect(() => { /*changes country data everytime country data changes */
        console.log(countryData)
        setCountryDataInfo(countryData)
    }, [countryData])

    return (
        <div className="countryInfo">
            <div className="countryName">{countryDataInfo.country}</div>

            <div className="caseCriticalContainer">
                <div className="caseContainer">

                    <label >Today cases
                        <div className="cases">{countryDataInfo.todayCases}</div>
                    </label>
                </div>

                <div className="criticalContainer">

                <label>Critical
                    <div className="critical">{countryDataInfo.critical}</div>
                </label>
                </div>

            </div>
            <div className="recoverDeathContainer">
                <div className="recoverContainer">
            <label>Today Recovered
                <div className="recovered">{countryDataInfo.todayRecovered}</div>
            </label>
            </div>
            <div className="deathContainer">

            <label>Today Death
                <div className="deaths">{countryDataInfo.todayDeaths}</div>
            </label>
            </div>

            </div>
            <div className="divider"/>

        </div>
    )

}
export default CountryDataView;