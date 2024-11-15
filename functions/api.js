
export async function fetchJson(url,options= {}){
    const headers = {Accept: "application/json",...options.headers}
    const response = await fetch(url,{...options, headers})
    if(response.ok){
        return await response.json()
    }
    else{
        throw new Error(await response.text())
    }
}
