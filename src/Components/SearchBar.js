import React, { useState , useEffect} from 'react';
import "./SearchBar.css"

function SearchBar({ onGoClick, placeholder, data, inputValue }) { /*search bar section consist of input and go button*/
    const [fData, setFData] = useState([]); /*suggestion list based on input word */
    const [text, setText] = useState(''); /* input text */
    const [showSuggestion, setShowSuggestion] = useState(''); /*to check if we show sugesstion or not */

    useEffect(()=>{

        setText(inputValue);
    }, [inputValue]);

    const handleInput = (e) => { /*handling input and cheking the input with data base to generate suggestions */
        setShowSuggestion(true);
        let matches = [];
        if(e.target.value.length>0){
            matches = data.filter(ctr => {
                const regex = new RegExp(`${e.target.value}`,"gi")
                return ctr.name.match(regex);
            } )
        }
        console.log(matches);
        setFData(matches);
        setText(e.target.value);
    }
    function handleGo(){ /*handle go button */
        //e.preventDefault();
        console.log("clicked Go", text);
        onGoClick(text);
      }
    const onSuggestHandle = (text) => { /*handle clicking on suggestions  */
        console.log(text)
        setText(text);
        setFData([]);
    }

    const handleKeyDown = (event) => { /*handle enter key for search */
        if (event.key === 'Enter') {
            onGoClick(text);
            setShowSuggestion(false)
        }
      }
    return (
        <div className="search">
            <div className="searchInput">
                <input onKeyDown={handleKeyDown} type="text" id="inputElement" value={text} placeholder={placeholder} 
                onChange={e=>handleInput(e)} 
                onBlur={() => {setTimeout(()=>{setFData([])},100)} /*to remove suggestions if client clickked out of suggestion box */
                }/>
            </div>
            <button onClick={handleGo}>Go</button>
             {showSuggestion&&<div className="dataResult">
             { fData && fData.map((suggest , i)=>
                <div onClick={()=>onSuggestHandle(suggest.name)} key={i} className="dataItem">{suggest.name}</div>
            )} 
            </div> } 
        </div>
    )
}

export default SearchBar;