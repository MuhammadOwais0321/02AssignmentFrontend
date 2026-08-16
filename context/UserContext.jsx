import { useContext, createContext, useState } from "react";

const userContext = createContext(null)

export const UserProvider= ({children})=>{
const [user, setUser] = useState({})

return(
  <userContext value={{user, setUser}}>
    {children}
  </userContext>
)
}

export const UseUser = ()=>{
  const context = useContext(userContext)
console.log(context);

  if(!context)  {
    throw new Error("useUser must be used within a UserProvider")
  }
    return context;

}