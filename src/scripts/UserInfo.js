export default class UserInfo {
    constructor({name, description, avatar}){
        this._name = name;
        this._description = description; 
        this._avatar = avatar;
    } 

    getUserInfo(){
        this._userInfo = {};
        this._userInfo.name = this._name.textContent;
        this._userInfo.description = this._description.textContent;
        this._userInfo.avatar = this._avatar.src;
        return this._userInfo;
    }

    setUserInfo(item){
        if (item.name) {
        this._name.textContent = item.name};
        if(item.about) {
        this._description.textContent = item.about};
        if(item.avatar) {
        this._avatar.src = item.avatar};    
    }
}