import React, { ReactElement, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Icons
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface searchInputProps {
    label?: string
    value: string
    id: string
    name: string
    errorMsg: string
    described_by?: string
    results: Array<ReactElement>
    style?: string
    updateValue: (value: string) => void
    searchAction: (value: string) => void
}

const SearchInput: React.FC<searchInputProps> = ({ label, value, id, name, errorMsg, updateValue, described_by, style, children, results, searchAction }) => {

    const mounted = useRef(false);

    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ ignoreBlur, setIgnoreBlur ] = useState(false);
    const [ searchTimeout, setSearchTimout ] = useState<ReturnType<typeof setTimeout>>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        updateValue(newValue);
        if(searchTimeout != undefined) clearInterval(searchTimeout);
        setSearchTimout(setTimeout(() => {
            if(!mounted.current) return null;
            searchAction(newValue);
        }, 500));
    }

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
            setShowDropdown(false);
            setIgnoreBlur(false);
            setSearchTimout(undefined);
        }
    },[])

    const describedBy = (
        <div className={`describedBy`}>
            <p id={`${id}-described-by`}>{ described_by }</p>
        </div>
    )

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
           e.stopPropagation();
        }
    }

    return (
        <div className="inputWrapper searchWrapper">
            { label ? <label htmlFor={id}>{ label }</label> : null }
            <div className="searchWrapper"
                onBlur={() => {
                    if(ignoreBlur) return;
                    setShowDropdown(false);
                }}>
                <input 
                    onClick={() => {
                        setShowDropdown(true);
                    }}
                    onKeyPress={handleKeyPress}
                    aria-describedby={`${id}-described-by`}
                    className={`inputStyle ${ style ? style : '' } ${ showDropdown ? 'dropdown-open' : '' }`}
                    value={value ? value : ''}
                    type="text"
                    name={name}
                    id={id}
                    onChange={(val) => {
                        setShowDropdown(true);
                        onChange(val);
                    }}/>
                <div 
                    className="searchIcon" 
                    onClick={() => {searchAction(value); setShowDropdown(true);}}>
                    <FontAwesomeIcon icon={faSearch}/>
                </div>
                {
                    showDropdown
                    ?
                    <div className="searchDropdown" 
                        onMouseDown={() => setIgnoreBlur(true)} 
                        onMouseUp={() => {
                            setIgnoreBlur(false);
                            setTimeout(() => {
                                setShowDropdown(false);
                            },20)
                        }}>
                        { 
                            results.length
                            ?
                            results
                            :
                            <div className="noData">
                                search for a page by its name
                            </div>
                        }
                    </div>
                    : null
                }

                <div className="inputError">
                    <p>{ errorMsg }</p>
                </div>
            </div>

            { 
                children 
            ?
                <> 
                    { described_by ?  <div className="describedBy">{describedBy}</div> : null }
                    { children } 
                    <span className={`speratorRow ${ style ? style : '' }`}></span>
                </> 
            : 
                <> 
                    { described_by ? <><div className="describedBy">{describedBy}</div><span className={`speratorRow ${ style ? style : '' }`}></span></> : null }
                </> 
            }
        </div>
    );
}

export default SearchInput;