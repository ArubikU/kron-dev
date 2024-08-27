import { generateUUIDv6 } from "../../lib/utils";
import { IKron, IKronGroup, IServerData, IServerDataBuilder, IUser } from "./interface";
export class JsonUser implements IUser {
    private id: string;
    private name: string;
    private tag: string;
    private avatar: string;
    private status: 'online' | 'offline' | 'dnd' | 'afk';
    private mbti: string;
    private followers: string[];
    private following: string[];
    private mail: string;
    private markers: string[];
    private rekrons: string[];

    constructor(user: {
        id: string,
        name: string,
        tag: string,
        avatar: string,
        status: 'online' | 'offline' | 'dnd' | 'afk',
        mbti: string,
        followers: string[],
        following: string[],
        mail: string
    }) {
        
        this.id = user.id === "none" ? generateUUIDv6() :user.id;
        this.name = user.name;
        this.tag = user.tag;
        this.avatar = user.avatar === "default"
            ? "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
            : user.avatar;
        this.status = user.status;
        this.mbti = user.mbti;
        this.followers = user.followers;
        this.following = user.following;
        this.mail = user.mail;
    }

    getId(): string { return this.id; }
    getName(): string { return this.name; }
    setName(name: string): void { this.name = name; }
    getTag(): string { return this.tag; }
    setTag(tag: string): void { this.tag = tag; }
    getAvatar(): string { return this.avatar; }
    setAvatar(avatar: string): void { this.avatar = avatar; }
    getStatus(): 'online' | 'offline' | 'dnd' | 'afk' { return this.status; }
    setStatus(status: 'online' | 'offline' | 'dnd' | 'afk'): void { this.status = status; }
    getMbti(): string { return this.mbti; }
    setMbti(mbti: string): void { this.mbti = mbti; }
    getFollowers(): string[] { return this.followers; }
    setFollowers(followers: string[]): void { this.followers = followers; }
    getFollowing(): string[] { return this.following; }
    setFollowing(following: string[]): void { this.following = following; }
    getMail(): string { return this.mail; }
    setMail(mail: string): void { this.mail = mail; }

    follow(user: IUser): void {
        if (!this.following.includes(user.getId())) {
            this.following.push(user.getId());
            user.setFollowers([...user.getFollowers(), this.id]);
        }
    }

    unfollow(user: IUser): void {
        this.following = this.following.filter(id => id !== user.getId());
        user.setFollowers(user.getFollowers().filter(id => id !== this.id));
    }
    getRekrons(): string[]{
        return this.rekrons
    }
    addRekron(post: IKron): void{
        let a = this.rekrons.find((k)=>{
            return k === post.getId()
        })
        if(!a){
            this.rekrons.unshift(post.getId())
        }
    }
    getMarkers(): string[]{
        return this.markers;
    }
    addMarker(post: IKron): void{
        let a = this.markers.find((k)=>{
            return k === post.getId()
        })
        if(!a){
            this.markers.unshift(post.getId())
        }
    }
    removeMarker(post: IKron): void{
        this.markers = this.markers.filter((k)=>{
            return k != post.getId()
        })
    }
}

export class LocalJsonUser extends JsonUser{

    private password: string;

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
    }) {
        super({
            id: user.id === "none" ? generateUUIDv6() :user.id,
            name : user.name,
            tag : user.tag,
            avatar : user.avatar === "default"
            ? "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
            : user.avatar,
            status : user.status,
            mbti : user.mbti,
            followers : user.followers,
            following : user.following,
            mail : user.mail
        })
        this.password = user.password;
    }
    getPassword(): string {return this.password}
    setPassword(password: string): void {this.password = password}

}

export class JsonKron implements IKron {
    private id: string;
    private userId: string;
    private content: string;
    private timestamp: string;
    private likes: string[] = [];
    private rekrons: string[];
    private comments: IKron[];
    private tags: string[];
    private image?: string;
    private groupId?: string;
    private public: boolean;
    private kronParent: string;

    constructor(
        id: string,
        userId: string,
        content: string,
        timestamp: string,
        likes: string[] = [],
        rekrons: string[] = [],
        comments: IKron[] = [],
        tags: string[] = [],
        image?: string,
        groupId?: string,
        isPublic: boolean = true
    ) {
        this.id = id === "none" ? generateUUIDv6() :id;
        this.userId = userId;
        this.content = content;
        this.timestamp = timestamp;
        this.likes = likes;
        this.rekrons = rekrons;
        this.comments = comments;
        this.tags = tags;
        this.image = image;
        this.groupId = groupId;
        this.public = isPublic;
    }
    isCommentKron(): boolean {
        return this.kronParent != null;
    }
    setCommentParent(kronId: string): void {
        this.kronParent = kronId;
    }

    getId(): string { return this.id; }
    getUserId(): string { return this.userId; }
    getContent(): string { return this.content; }
    setContent(content: string): void { this.content = content; }
    getTimestamp(): string { return this.timestamp; }
    setTimestamp(timestamp: string): void { this.timestamp = timestamp; }
    getLikes(): string[] { return this.likes; }
    getRekrons(): string[] { return this.rekrons; }
    setRekrons(rekrons: string[]): void { this.rekrons = rekrons; }
    getComments(): IKron[] { return this.comments; }
    addComment(comment: IKron): void { this.comments.push(comment); }
    getTags(): string[] { return this.tags; }
    setTags(tags: string[]): void { this.tags = tags; }
    getImage(): string | undefined { return this.image; }
    setImage(image?: string): void { this.image = image; }
    getGroupId(): string | undefined { return this.groupId; }
    setGroupId(groupId?: string): void { this.groupId = groupId; }
    isGroupKron(): boolean { return this.groupId != null; }
    like(user: JsonUser): void { 
        this.likes.unshift(user.getId())
     }
     unlike(user: JsonUser): void { 
        this.likes= this.likes.filter((e) => e!= user.getId())
      }
      liking(user: JsonUser): boolean { 
          return this.likes.includes(user.getId());
       }
    reKron(user: IUser): void { 
         
        let a = this.rekrons.find((k)=>{
            return k === user.getId()
        })
        if(!a){
            this.rekrons.unshift(user.getId())
        }
    }
    setPublic(isPublic: boolean): void { this.public = isPublic; }
    isPublic(): boolean { return this.public; }
}
export class JsonKronGroup implements IKronGroup {
    private id: string;
    private name: string;
    private description: string = "";
    private members: string[];
    private krons: string[];

    constructor(id: string, name: string, members: string[] = [], krons: string[] = []) {
        this.id = id === "none" ? generateUUIDv6() :id;
        this.name = name;
        this.members = members;
        this.krons = krons;
    }
    setDescription(desc: string): void {
        this.description = desc;
    }

    getId(): string { return this.id; }
    getName(): string { return this.name; }
    setName(name: string): void { this.name = name; }
    getMembers(): string[] { return this.members; }
    addMember(userId: string): void {
        if (!this.members.includes(userId)) {
            this.members.push(userId);
        }
    }
    removeMember(userId: string): void {
        this.members = this.members.filter(id => id !== userId);

    }
    getKrons(): string[] { return this.krons; }
    addKron(kronId: string): void {
        if (!this.krons.includes(kronId)) {
            this.krons.push(kronId);
        }
    }
}
export class JsonServerData implements IServerData {
    private users: { id: string, user: JsonUser }[] = [];
    private krons: { id: string, kron: JsonKron }[] = [];
    private groups: { id: string, kronGroup: JsonKronGroup }[] = [];
    private privateKeys: { mail: string, password: string }[] = [];
    private userKrons: { id: string, krons: string[] }[] = [];

    verifyUser(email: string, password: string): boolean {
        const userKey = this.privateKeys.find(
            (key) => key.mail === email && key.password === password
        );
        return userKey !== undefined;
    }

    getUserByEmail(email: string): IUser | null {
        const userEntry = this.users.find((entry) => entry.user.getMail() === email);
        return userEntry ? userEntry.user : null;
    }

    getAllKrons(): { id: string, kron: JsonKron }[] {return this.krons;}
    getAllUsers(): { id: string, user: JsonUser }[] {return this.users;}
    getKron(id: string): JsonKron | undefined {
        return this.krons.find((e)=>e.id = id)?.kron;
    }
    getAllGroups(): { id: string, kronGroup: JsonKronGroup }[] {return this.groups;}
    postKron(post: IKron): void {
        this.krons.unshift({ id: post.getId(), kron: post as JsonKron });

        if (post.isGroupKron()) {
            const groupEntry = this.groups.find(entry => entry.id === post.getGroupId());
            if (groupEntry) {
                groupEntry.kronGroup.addKron(post.getId());
            }
        } else {
            const userKronEntry = this.userKrons.find(entry => entry.id === post.getUserId());
            if (userKronEntry) {
                userKronEntry.krons.unshift(post.getId());
            } else {
                this.userKrons.unshift({ id: post.getUserId(), krons: [post.getId()] });
            }
        }
    }
    postAllKrons(krons: IKron[]) {
      krons.forEach(kron => {
        this.postKron(kron);
      });
    }

    getUserKrons(user: IUser): IKron[] {
        const userKronEntry = this.userKrons.find(entry => entry.id === user.getId());
        if (!userKronEntry) {
            return [];
        }
        return this.krons
            .filter(kronEntry => userKronEntry.krons.includes(kronEntry.id))
            .map(kronEntry => kronEntry.kron);
    }

    getGroupKrons(group: IKronGroup): IKron[] {
        return this.krons
            .filter(kronEntry => group.getKrons().includes(kronEntry.id))
            .map(kronEntry => kronEntry.kron);
    }

    addUser(user: IUser, id: string): void {
        this.users.push({ id, user: user as JsonUser });
    }

    addPrivateKey(mail: string, password: string): void {
        this.privateKeys.push({ mail, password });
    }

    addKron(kron: IKron): void {
        this.krons.push({ id: kron.getId(), kron: kron as JsonKron });
    }

    addUserKrons(userId: string, kronIds: string[]): void {
        this.userKrons.push({ id: userId, krons: kronIds });
    }

    addGroup(kronGroup: IKronGroup): void {
        this.groups.push({ id: kronGroup.getId(), kronGroup: kronGroup as JsonKronGroup });
    }
    updateKronGroup(group: JsonKronGroup): void {
        const groupIndex = this.groups.findIndex(g => g.id === group.getId());
        if (groupIndex !== -1) {
            this.groups[groupIndex].kronGroup = group;
        } else {
            throw new Error(`Group with id ${group.getId()} not found`);
        }
    }
    updateKronUser(user: JsonUser): void {
        const userIndex = this.users.findIndex(u => u.id === user.getTag());
        if (userIndex !== -1) {
            this.users[userIndex].user = user;
        } else {
            throw new Error(`User with tag ${user.getTag()} not found`);
        }
    }
    
    
}
export class JsonServerDataBuilder implements IServerDataBuilder {
    private data: JsonServerData = new JsonServerData();

    build(): IServerData {
        return this.data;
    }

    addUser(user: IUser, tag: string): IServerDataBuilder {
        this.data.addUser(user, tag);
        return this;
    }

    addPrivateKey(mail: string, password: string): IServerDataBuilder {
        this.data.addPrivateKey(mail, password);
        return this;
    }

    addKron(kron: IKron): IServerDataBuilder {
        this.data.addKron(kron);
        return this;
    }

    addUserKrons(userId: string, kronIds: string[]): IServerDataBuilder {
        this.data.addUserKrons(userId, kronIds);
        return this;
    }

    addGroup(kronGroup: IKronGroup): IServerDataBuilder {
        this.data.addGroup(kronGroup);
        return this;
    }
}
