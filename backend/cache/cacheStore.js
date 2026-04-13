const cache = {}

function get(key){

    const data = cache[key]

    if(!data){
        return null
    }

    const now = Date.now()

    if(now > data.expiry){
        delete cache[key]
        return null
    }

    return data.value
}

function set(key,value,ttl=60000){

    cache[key] = {
        value:value,
        expiry: Date.now() + ttl
    }

}

module.exports = {get,set}