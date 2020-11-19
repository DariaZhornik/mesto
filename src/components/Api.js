export default class Api {
    constructor(ownerInfo) {
        this._cohort = ownerInfo.cohort;
        this._authorization = ownerInfo.authorization;
        this._url = ownerInfo.url;
        this._id = ownerInfo.id;
    }

    _checkResponse(result) {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(result.status);
    }

    getInitialCards() {
        return fetch(this._url + '/cards', {
            headers: {
                authorization: this._authorization
            }
        }).then((result) => this._checkResponse(result));
    }

    getUserInfo() {
        return fetch(this._url + '/users/me', {
            headers: {
                authorization: this._authorization,
            }
        }).then((result) => this._checkResponse(result));
    }

    changeUserInfo(object) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        }).then((result) => this._checkResponse(result));
    }

    addNewCard(name, link) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, link: link})
        }).then((result) => this._checkResponse(result));
    }

    deleteCard(id) {
        return fetch(this._url + '/cards/' + id, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
        }).then((result) => this._checkResponse(result));        
    }

    addLike(id) {
        return fetch(this._url + '/cards/likes/' + id, {
            method: 'PUT',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
        }).then((result) => this._checkResponse(result));        
    }

    removeLike(id) {
        return fetch(this._url + '/cards/likes/' + id, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
        }).then((result) => this._checkResponse(result));        
    }

    changeAvatar(avatar) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({avatar: avatar})
        }).then((result) => this._checkResponse(result));      
    }

}

