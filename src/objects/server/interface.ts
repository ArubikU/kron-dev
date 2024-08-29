export interface IUser {
    getId(): string;
    getName(): string;
    setName(name: string): void;
    getTag(): string;
    setTag(tag: string): void;
    getAvatar(): string;
    setAvatar(avatar: string): void;
    getStatus(): 'online' | 'offline' | 'dnd' | 'afk';
    setStatus(status: 'online' | 'offline' | 'dnd' | 'afk'): void;
    getMbti(): string;
    setMbti(mbti: string): void;
    getFollowers(): string[];
    setFollowers(followers: string[]): void;
    getFollowing(): string[];
    setFollowing(following: string[]): void;
    getMail(): string;
    setMail(mail: string): void;
    follow(user: IUser): void;
    unfollow(user: IUser): void;
    getRekrons(): string[];
    addRekron(post: IKron): void;
    getMarkers(): string[];
    setMarker(markers: string[]) : void;
    addMarker(post: IKron): void;
    removeMarker(post: IKron): void;
}

export interface ILocalUser extends IUser {
    getPassword(): string;
    setPassword(password: string): void;
}

export interface IKron {
    getId(): string;
    getUserId(): string;
    getContent(): string;
    setContent(content: string): void;
    getTimestamp(): string;
    setTimestamp(timestamp: string): void;
    getLikes(): string[];
    getRekrons(): string[];
    setRekrons(rekrons: string[]): void;
    getComments(): IKron[];
    addComment(comment: IKron): void;
    getTags(): string[];
    setTags(tags: string[]): void;
    getImage(): string | undefined;
    setImage(image?: string): void;
    getGroupId(): string | undefined;
    setGroupId(groupId?: string): void;
    isGroupKron(): boolean;
    isCommentKron(): boolean;
    like(user: IUser): void;
    unlike(user: IUser): void;
    liking(user: IUser): boolean;
    reKron(user: IUser): void;
    setCommentParent(kronId: string): void;
    setPublic(isPublic: boolean): void;
    isPublic(): boolean;
}

export interface IKronGroup {
    getId(): string;
    getName(): string;
    setName(name: string): void;
    getMembers(): string[];
    addMember(userId: string): void;
    removeMember(userId: string): void;
    getKrons(): string[];
    addKron(kronId: string): void;
    setDescription(desc: string): void;
    setPrivate(state: boolean): void;
    isPublic(): boolean;
}

export class Tag {
    tag: string;
    amount: number;
}

export interface IServerData {
    verifyUser(email: string, password: string): boolean;
    getUserByEmail(email: string): IUser | null;
    postKron(post: IKron): void;
    postAllKrons(krons: IKron[]): void;
    getUserKrons(user: IUser): IKron[];
    getGroupKrons(group: IKronGroup): IKron[];
    addUser(user: IUser, tag: string): void;
    addPrivateKey(mail: string, password: string): void;
    addKron(kron: IKron): void;
    addUserKrons(userId: string, kronIds: string[]): void;
    addGroup(kronGroup: IKronGroup): void;
    updateKronGroup(group: IKronGroup): void;
    updateKronUser(user: IUser): void;
    getAllKrons(): { id: string, kron: IKron }[];
    getKron(id: string): IKron | undefined;
    getUser(id: string): IUser | undefined;
    getGroup(id: string): IKronGroup | undefined;
    getAllUsers(): { id: string, user: IUser }[];
    getAllGroups(): { id: string, kronGroup: IKronGroup }[];
    getSuggestedTags(): string[];
    pushTag(tag: string[]): void;

    filterUsers(searchTerm: string): IUser[];
    filterPosts(searchTerm: string): IKron[];
    filterGroups(searchTerm: string): IKronGroup[];
}

export interface IServerDataBuilder {
    build(): IServerData;
    addUser(user: IUser, tag: string): IServerDataBuilder;
    addPrivateKey(mail: string, password: string): IServerDataBuilder;
    addKron(kron: IKron): IServerDataBuilder;
    addUserKrons(userId: string, kronIds: string[]): IServerDataBuilder;
    addGroup(kronGroup: IKronGroup): IServerDataBuilder;
}
export class LocalData {
    private user: ILocalUser;
    private currentKrons: string[];

    public activeView: string = "home";
    public searchTerm: string = "";
    public activeSearchTab: string = "posts";
    public selectedGroup: IKronGroup | null
    public selectedUser: IUser| null
    public copiedKronId: string | null
    public userIp: string | null;
    public newKronContent: string ;
    public newKronImage: any | null;
    public newKronImagePreview: any | null;
    public activeComments: string | null;
    public newComment: string;

    setActiveSearchTab(searchtTab: string): void{
        this.activeSearchTab = searchtTab;
      }

    getTittle(): string{
        switch(this.activeView){
            case("home"): {return "Feed"}
            case("explore"): {return "Search"}
            case("group"): {return "Groups"}
            case("profile"): {return "Profile"}
            case("following"): {return "Fans"}
        }
        return "Feed";
    }
  
    setSearchTerm(searchTerm: string): void{
        this.searchTerm = searchTerm;
      }
    setActiveView(view: string): void{
      this.activeView = view;
    }
    setSelectedGroup(group: IKronGroup | null): void{
        this.selectedGroup = group;
        
    }
    setSelectedUser(user: IUser): void{
        this.selectedUser = user;
        
    }
    setCopiedKronId(copiedId: string): void{
        this.copiedKronId = copiedId;
        
    }
    setUserIp(copiedId: string): void{
        this.userIp = copiedId;
        
    }
    setNewKronContent(data: string ): void{
        this.newKronContent = data;
        
    }
    setNewKronImage(data: any | null): void{
        this.newKronImage = data;
        
    }
    setNewKronImagePreview(data: any | null): void{
        this.newKronImagePreview = data;
        
    }
    setActiveComments(data: string | null): void{
        this.activeComments = data;
        
    }
    setNewComment(data: string ): void{
        this.newComment = data;
        
    }
    constructor(user: ILocalUser, krons: string[]) {
        this.user = user;
        this.currentKrons = krons;
    }

    getUser(): ILocalUser {
        return this.user;
    }

    getCurrentKrons(): string[] {
        return this.currentKrons;
    }

    isValid(serverData: IServerData): boolean {
        return serverData.verifyUser(this.user.getMail(), this.user.getPassword());
    }
}
