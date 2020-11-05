export default class UserInfo {
    constructor({name, description}){
        this._name = name;
        this._description = description; 
    } 

    getUserInfo(){
        this._userInfo = {};
        this._userInfo.name = this._name.textContent;
        this._userInfo.description = this._description.textContent;
        return this._userInfo;
    }

    setUserInfo(item){
        this._name.textContent = item["person-name"];
        console.log(item);
        this._description.textContent = item["person-job"];
    }
}