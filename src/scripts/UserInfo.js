export default class UserInfo {
    constructor({name, description, avatar, ownerId}){
        this._name = name;
        this._description = description; 
        this._avatar = avatar;
        this._ownerId = ownerId;
    } 

    getUserInfo(){
        this._userInfo = {};
        this._userInfo.name = this._name.textContent;
        this._userInfo.description = this._description.textContent;
        return this._userInfo;
    }

    setUserInfo(item){
        this._name.textContent = item.name;
        this._description.textContent = item.about;
        this._avatar.src = item.avatar;
    }
}