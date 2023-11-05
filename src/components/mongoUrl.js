/**
 * mongodb url generate
 * 
 * 
 * 
 */
/**
 * get url (gen mongodb url)
 */
/*
function getUrl(){
    var web_server = window.location.host
    console.log(web_server)
    var backend = web_server.split(':')[0] + ':5002'
    return backend
}
*/
function getUrl(){
    return 'http://localhost:5150/'
}

export default {
    getUrl: getUrl
}