
/** Save data into localStorage */
export const savePersistance = (key: string, object: Object) => {
    const _item = JSON.stringify(object)
    localStorage.setItem(key, _item)
}

/** Get data from localStorage */
export const getPersistance = (key: string) => {
    let _item = localStorage.getItem(key)
    return _item ? JSON.parse(_item) : null
}

export const removePersistance = (key: string) => {
    localStorage.removeItem(key)
}

export const formatUrl = (url: string) => {

    const _repSpace = ' '
    const _regexSpace = new RegExp(_repSpace, 'g')
    const _transformedUrl = url.replace(_regexSpace, '-').toLowerCase()

    const _repSlashAndSpace = '-/-'
    const _regSlash = new RegExp(_repSlashAndSpace, 'g')
    const _cleanUrl = _transformedUrl.replace(_regSlash, '-').toLowerCase()

    return _cleanUrl
}

