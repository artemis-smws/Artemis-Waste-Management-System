export const handleSigninWithEmail = async(req : Object) => {
    const requestOptions = {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(req)
    }

    const response = await fetch('https://us-central1-artemis-b18ae.cloudfunctions.net/server/auth/signin', requestOptions)
    return response
}