import { createContext, useActionState, useContext, useState } from "react";

const TabContext = createContext();
export default function Tab({children, defaultValue}){
    const [currentTab, setCurrentTab] = useState(defaultValue);
    return (
        <TabContext.Provider value={{currentTab, setCurrentTab}}>
            {children}
        </TabContext.Provider>
    )
}


function Trigger({value}){
    const {currentTab, setCurrentTab} = useContext(TabContext)
    const isActive = currentTab === value;


    return (
        
        <button disabled={isActive} onClick={()=>{setCurrentTab(value)}}>{value}</button>
    )
}


function Content({children, value}){
    const {currentTab, setCurrentTab} = useContext(TabContext)
    if (value !== currentTab) return null;

    return children;
}



Tab.Trigger = Trigger;
Tab.Content = Content;