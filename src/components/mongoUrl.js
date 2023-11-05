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
    var web_server = window.location.host
    console.log(web_server)
    var backend = web_server.split(':')[0] + ':5150'
    return backend
}

export default {
    getUrl: getUrl
}