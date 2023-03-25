import axios from 'axios'

const setAccToken = token => {
    if (token) {
        axios.defaults.headers.common['Accountization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Accountization']
    }
}

export default setAccToken