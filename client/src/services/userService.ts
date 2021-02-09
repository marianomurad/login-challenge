export const userService = {
    logIn:  (body: any, cb: any, errCb: any) => handleUserPostRequest(body, cb, errCb, 'login'),
    signUp: (body: any, cb: any, errCb: any) => handleUserPostRequest(body, cb, errCb, 'signup'),
    getUserInfo: (cb: any, errCb: any, token: string) => handleUserGetRequest(cb, errCb, 'me/user-info', token),
}

const handleUserPostRequest = (body: any, cb: any, errCb: any, route: string) => {
    const url = `http://localhost:3001/user/${route}`
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => {
            return res.json()
        })
        .catch(error => errCb(error))
        .then(res => cb(res))
}

const handleUserGetRequest = (cb: any, errCb: any, route: string, token: string) => {
    const url = `http://localhost:3001/user/${route}`
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(res => {
            return res.json()
        })
        .catch(error => errCb(error))
        .then(res => cb(res))
}


