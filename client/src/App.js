import React, { createContext, useState } from 'react';
import Body from "./Body";


export const EmailContext = createContext();
function App() {
  const [email, setEmail] = useState('');
  const [adminLog,setAdminLog]=useState(false);
  // localStorage.setItem('adminLog', true);
  // localStorage.setItem('email','')
 
  return (
    <div className='' >
      
      <EmailContext.Provider value={{ email, setEmail,setAdminLog,adminLog }}>
      <Body/>
    </EmailContext.Provider>
    </div>
    
   
  );
}

export default App;
