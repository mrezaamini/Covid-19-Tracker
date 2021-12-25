// EXTRA PARTS IMPLEMENTED: REACT / LOCALSTORAGE / EXTRA UI DESIGN AND ELEMENTS (UI,LOADING,SEARCH SUGGESTIONS) / RESPONSIVE
import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar.js'
import ReportType from './Components/ReportType.js'
import History from './Components/History.js'
import CountryDataView from './Components/CountryDataView.js'
import Loading from './Components/Loading.js'


function App() {

  const [countries, setCountries] = useState([]); /*countries from API*/
  const [countryData, setCountryData] = useState({});  /*data for specific country*/
  const [showTopList, setShowTopList] = useState(true) /*to see if we need to show top 5 (input: emoty)*/
  const [historyList, setHistoryList] = useState([]); /*search histories*/
  const [reportType, setReportType] = useState("todayCases"); /*data comes from radio selects*/
  const [topList, setTopList] = useState([]); /* list of top 5 countries in specific query */
  const [loading, setLoading] = useState(false);  /*true whenever we are loading data from API */
  const [showError, setShowError] = useState(false);  /*true when some error like wrong input accure */
  const [inputValue, setInputValue] = useState("");  /*to store input value for passing to functions*/

  useEffect(() => {  /*used when mounting web page, for fetching countries to make suggestions based on the word client searched*/
    const getCountries = async () => {
      await fetch("https://corona.lmao.ninja/v2/countries?0&cases").then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ( /* just keeping useful data for suggestions part*/
            {
              name: country.country,
              value: country.countryInfo.iso2
            }));
          setCountries(countries);
        });
    };
    getCountries();
    loadHistory();
    handleReportTypeSelect(reportType);
    
  }, []);

  const saveHistory = () => { /*used for saving history in localStorage with key history data */
    localStorage.setItem('historyData',JSON.stringify(historyList));
  }



  const loadHistory=() => { /*loading data from localSorage and check if its empty or not if not set it to history list */
    let data=localStorage.getItem('historyData');
    data=JSON.parse(data);
    if(!data)setHistoryList([]);
    else setHistoryList(data)
  }
  const GoHandle = async (countryName) => {  /*handle Go when its clicked */
    setInputValue(countryName)
    setShowError(false) /*specifing that input has no error so we dont want to show error to client */
    if (countryName) {

      setLoading(true)   /*fetching specific country data */
      await fetch(`https://corona.lmao.ninja/v2/countries/${countryName}?yesterday=false&strict=true&query`).then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setShowError(true)
            setLoading(false);
            
          }
          else {
            setCountryData(data);
            setLoading(false)  
            if (historyList.indexOf(data.country.toLowerCase()) < 0) {
              setHistoryList([...historyList, data.country.toLowerCase()]); /* add new country to history list if it doesn't already exist*/
             
            }
            setShowTopList(false)
          }

        })

    }
    else { /*if input is empty show top 5 country based on radio select */
      setShowTopList(true);
      handleReportTypeSelect(reportType);
    }

  }

  const handleReportTypeSelect = async (type) => {  /*return top 5 from API based on radio selection */
    setReportType(type);
    setLoading(true)
    await fetch(`https://corona.lmao.ninja/v2/countries?sort=${type}`).then((response) => response.json())
      .then((data) => {
        setTopList(data.slice(0, 5))
        setLoading(false)
      })

  }

  return (
    <div className="app">
      {/* app header consists of title, search bar and report type (radio selection) */}
      <div className="app__header"> 
        <h1>COVID-19 TRACKER</h1>
        <SearchBar inputValue={inputValue} onGoClick={(countryName) => GoHandle(countryName)} placeholder={"World Wide"} data={countries} />
        <ReportType onReportSelect={(reportType) => handleReportTypeSelect(reportType)} reportType={reportType} />
      </div>

      <div>
        <div className="column sidebar">
          <History onClearClick={()=>{setHistoryList([]);localStorage.clear()}} historyData={historyList} />

        </div>
        {/* choose which content in main part we want to show based on flags we set before: loading/error/top5 list/ country data*/}
        <div className="column mainContent"> 
          {!loading && showError && (<div className="error">Country not found or doesn't have any cases<br/>Please <button onClick={() =>{GoHandle();setInputValue("")}}>try again</button></div>)}
          {!loading ?
            <div>
              {showTopList && !showError ? <div>{topList.map((eachCountry, i) => (<CountryDataView key={i} countryData={eachCountry} />))}</div>
                :
                !showError&&<div>
                  <CountryDataView countryData={countryData}></CountryDataView>
                  {saveHistory()}
                </div>


              }
            </div>
            : <Loading />}

        </div>
      </div>

    </div>
  );
}

export default App;
