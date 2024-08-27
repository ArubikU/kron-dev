export class User {
    id: string;
    name: string;
    tag: string;
    avatar: string;
    status: 'online' | 'offline' | 'dnd' | 'afk';
    mbti: string;
    followers: string[];
    following: string[];
    mail: string;
  
    constructor(user:{
        id: string,
        name: string,
        tag: string,
        avatar: string,
        status: 'online' | 'offline' | 'dnd' | 'afk',
        mbti: string,
        followers: string[],
        following: string[],
        mail: string}
      ) {
        this.id = user.id;
        this.name = user.name;
        this.tag = user.tag;
        this.avatar = user.avatar;
        this.status = user.status;
        this.mbti = user.mbti;
        this.followers = user.followers;
        this.following = user.following;
        this.mail = user.mail;
      }
  
    follow(user: User) {
      if (!this.following.includes(user.id)) {
        this.following.push(user.id);
        user.followers.push(this.id);
      }
    }
  
    unfollow(user: User) {
      this.following = this.following.filter((id) => id !== user.id);
      user.followers = user.followers.filter((id) => id !== this.id);
    }
  }

export class LocalUser extends User{
    password: string;
    
    constructor(user: {
      id: string,
      name: string,
      tag: string,
      avatar: string,
      status: 'online' | 'offline' | 'dnd' | 'afk',
      mbti: string,
      followers: string[],
      following: string[],
      mail: string,
      password: string
    }
      ) {
            super({id: user.id, name: user.name, tag: user.tag, avatar: user.avatar, status: user.status, mbti: user.mbti, followers: user.followers, following: user.following, mail: user.mail});

            this.password = user.password;
      }

}