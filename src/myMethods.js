export const useRefreshToken = async () => {
  const Url = "http://localhost:3000/api/refreshToken";
  const res = await fetch(Url, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if(!res.ok){
    console.log(`hi`)
    
  }
  const data = await res.json()
  localStorage.setItem('token',data.token)
  return data;
};
