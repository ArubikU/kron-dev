import { generateUUIDv6 } from "../../../lib/utils";
import { IKron, IKronGroup, IServerData, IServerDataBuilder, IUser, MBTI, MBTIfromName, Tag } from "./interface";
export class KronUser implements IUser {
    private id: string;
    private name: string;
    private tag: string;
    private avatar: string;
    private status: 'online' | 'offline' | 'dnd' | 'afk';
    private mbti: MBTI;
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
        mbti: string | MBTI,
        followers: string[],
        following: string[],
        mail: string,
        rekrons?: string[],
        markers?: string[]
    }) {
        
        this.id = user.id === "none" ? generateUUIDv6() :user.id;
        this.name = user.name;
        this.tag = user.tag;
        this.avatar = user.avatar === "default"
            ? "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
            : user.avatar;
        this.status = user.status;
        if(user.mbti instanceof MBTI){
            this.mbti = user.mbti;
        }else{
            this.mbti = MBTIfromName(user.mbti);
        }
        this.followers = user.followers;
        this.following = user.following;
        this.mail = user.mail;
        if(user.rekrons){
            this.rekrons = user.rekrons;
        }else{
            this.rekrons = []
        }
        if(user.markers){
            this.markers = user.markers;
        }else{
            this.markers = []
        }
    }
    setMarker(markers: string[]): void {
        this.markers = markers;
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
    getMbti(): MBTI { return this.mbti; }
    setMbti(mbti: MBTI ): void { this.mbti = mbti; }
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
        
        if(!this.rekrons.includes(post.getId())){
            this.rekrons.unshift(post.getId())
        }
    }
    getMarkers(): string[]{
        return this.markers;
    }
    addMarker(post: IKron): void{
        if(!this.getMarkers().includes(post.getId())){
            let mark  = this.markers;
            mark.unshift(post.getId())
            this.setMarker(mark);
        }
    }
    removeMarker(post: IKron): void{
        this.setMarker(this.getMarkers().filter((k)=>{
            return k != post.getId()
        }))
    }
}

export class LocalKronUser extends KronUser{

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
    }

}

export class Kron implements IKron {
    private id: string;
    private userId: string;
    private content: string;
    private timestamp: string;
    private likes: string[];
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
        rekrons: string[] = [""],
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
        this.comments = comments;
        this.tags = tags;
        this.image = image;
        this.groupId = groupId;
        this.public = isPublic;
        this.setRekrons(rekrons)
        this.setTags(content.match(/#\w+/g) || [])
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
    like(user: KronUser): void { 
        this.likes.unshift(user.getId())
     }
     unlike(user: KronUser): void { 
        this.likes= this.likes.filter((e) => e!= user.getId())
      }
      liking(user: KronUser): boolean { 
          return this.likes.includes(user.getId());
       }
    reKron(user: IUser): void { 
        if(this.rekrons.length<=0){
            this.rekrons.unshift(user.getId())
        }
        if(!this.rekrons.includes(user.getId())){
            this.rekrons.unshift(user.getId())
        }
    }
    setPublic(isPublic: boolean): void { this.public = isPublic; }
    isPublic(): boolean { return this.public; }
}
export class KronGroup implements IKronGroup {
    private id: string;
    private name: string;
    private description: string = "";
    private members: string[];
    private krons: string[];
    private public: boolean = true;

    constructor(id: string, name: string, members: string[] = [], krons: string[] = []) {
        this.id = id === "none" ? generateUUIDv6() :id;
        this.name = name;
        this.members = members;
        this.krons = krons;
    }
    isPublic(): boolean {
        return this.public;
    }
    setPrivate(state: boolean): void {
        this.public = state;
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
    setPassword(user: IUser, password: string) {
        this.privateKeys.set(user.getId(),password);
    }
    filterUsers(searchTerm: string): IUser[] {return this.users.map((e)=> e.user).filter(user =>
        user.getName().toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.getTag().toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    filterPosts(searchTerm: string): IKron[] {

        if((searchTerm.match(/#\w+/g) || []).length >0){
            let tags = searchTerm.match(/#\w+/g) || [];
            let normalSearchTerm = searchTerm.replace(/#\w+/g, '').trim().toLowerCase();
        
            return this.krons.map((e) => e.kron).filter(kron => {
              // Verificar si los hashtags coinciden
              const tagMatch = tags.every(tag => 
                kron.getTags().some(kronTag => kronTag.toLowerCase() === tag.toLowerCase())
              );
        
              // Verificar si las palabras normales coinciden
              const contentMatch = normalSearchTerm 
                ? kron.getContent()
                    .toLowerCase()
                    .split(' ')
                    .some(word => word.includes(normalSearchTerm))
                : true;
        
              return tagMatch && contentMatch;
            });
        }

        return this.krons.map((e) => e.kron).filter(kron => {
          const search = searchTerm.toLowerCase();
          
          // Buscar coincidencia en el contenido palabra por palabra
          const contentMatch = kron.getContent()
            .toLowerCase()
            .split(' ')
            .some(word => word.includes(search));
          
          // Buscar coincidencia en las etiquetas
          const tagMatch = kron.getTags()
            .some(tag => tag.toLowerCase().includes(search));
          
          return contentMatch || tagMatch;
        });
      }
      
    filterGroups(searchTerm: string): IKronGroup[] {return this.groups.map((e)=> e.kronGroup).filter(group =>
        group.getName().toLowerCase().includes(searchTerm.toLowerCase()) && group.isPublic()
      )
    }
    private users: { id: string, user: KronUser }[] = [];
    private krons: { id: string, kron: Kron }[] = [];
    private groups: { id: string, kronGroup: KronGroup }[] = [];
    private privateKeys: Map<string,string> = new Map<string,string>();
    private userKrons: { id: string, krons: string[] }[] = [];
    private tags: Tag[] = [];
    

    // Retorna un arreglo de tags sugeridos basado en alguna lógica, por ejemplo, las etiquetas más comunes
    getSuggestedTags(): string[] {
        // Ordena las etiquetas por la cantidad en orden descendente y devuelve solo los nombres de las etiquetas
        return this.tags
            .sort((a, b) => (b.amount - a.amount))
            .map(t => t.tag)
            .slice(0, 5); // Retorna las 5 etiquetas más comunes como sugerencias
    }

    // Agrega nuevas etiquetas al arreglo de tags, incrementando la cantidad si ya existe
    pushTag(newTags: string[]): void {
        newTags.forEach(tag => {
            const existingTag = this.tags.find(t => t.tag === tag);
            if (existingTag) {
                existingTag.amount++;
            } else {
                this.tags.push({ tag, amount: 1 });
            }
        });
    }

    verifyUser(email: string, password: string): boolean {
        if(!this.privateKeys.has(email)) return false;
        return this.privateKeys.get(email)===password;
    }

    getUserByEmail(email: string): IUser | null {
        const userEntry = this.users.find((entry) => entry.user.getMail() === email);
        return userEntry ? userEntry.user : null;
    }

    getAllKrons(): { id: string, kron: Kron }[] {return this.krons;}
    getAllUsers(): { id: string, user: KronUser }[] {return this.users;}
    getKron(id: string): Kron | undefined {
        return this.krons.find((e)=>e.id = id)?.kron;
    }
    getAllGroups(): { id: string, kronGroup: KronGroup }[] {return this.groups;}
    postKron(post: IKron): void {
        this.krons.unshift({ id: post.getId(), kron: post as Kron });

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
        this.pushTag(post.getTags())
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
        this.users.push({ id, user: user as KronUser });
    }

    addPrivateKey(mail: string, password: string): void {
        this.privateKeys.set(mail, password );
    }

    addKron(kron: IKron): void {
        this.postKron(kron)
    }

    addUserKrons(userId: string, kronIds: string[]): void {
        this.userKrons.push({ id: userId, krons: kronIds });
    }

    addGroup(kronGroup: IKronGroup): void {
        this.groups.push({ id: kronGroup.getId(), kronGroup: kronGroup as KronGroup });
    }
    updateKronGroup(group: KronGroup): void {
        const groupIndex = this.groups.findIndex(g => g.id === group.getId());
        if (groupIndex !== -1) {
            this.groups[groupIndex].kronGroup = group;
        } else {
            throw new Error(`Group with id ${group.getId()} not found`);
        }
    }
    updateKronUser(user: KronUser): void {
        const userIndex = this.users.findIndex(u => u.id === user.getTag());
        if (userIndex !== -1) {
            this.users[userIndex].user = user;
        } else {
            throw new Error(`User with tag ${user.getTag()} not found`);
        }
    }
    getUser(id: string): IUser | undefined {
        return this.users.find((k)=> k.id===id)?.user;
    }
    getGroup(id: string): IKronGroup | undefined {
        return this.groups.find((k)=> k.id===id)?.kronGroup;
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
