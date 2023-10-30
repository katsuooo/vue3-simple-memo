/**
 * mongodb url generate
 * 
 * 
 * 
 */
/**
 * get url (gen mongodb url)
 */
function getUrl(){
    //return io.request.connection.remoteAddress
    var web_server = window.location.host
    var backend = web_server.split(':')[0] + ':5001'
    return backend
}

export default {
    getUrl: getUrl
}