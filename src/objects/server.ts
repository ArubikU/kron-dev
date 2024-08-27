import { v4 as uuidv4 } from 'uuid';
import { LocalUser, User } from "./user";
export class Kron {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
  rekrons: number;
  comments: Kron[];
  tags: string[];
  image?: string;
  groupId?: string;
  public: boolean;

  constructor(
    userId: string,
    content: string,
    timestamp: string,
    likes: number,
    rekrons: number,
    comments: Kron[],
    tags: string[],
    image?: string
  ) {
    this.id = uuidv4(),
    this.userId = userId;
    this.content = content;
    this.timestamp = timestamp;
    this.likes = likes;
    this.rekrons = rekrons;
    this.comments = comments;
    this.tags = tags;
    this.image = image;
  }

  setGroup(group: string){
    this.groupId = group;
  }

  isGroupKron(){
    return this.groupId != null;
  }

  addComment(comment: Kron) {
    this.comments.push(comment);
  }

  like() {
    this.likes += 1;
  }

  reKron() {
    this.rekrons += 1;
  }

  private() {
    this.public = false;
  }
}

export class KronGroup {
  id: string;
  name: string;
  members: string[];
  krons: string[];

  constructor( name: string, members: string[], krons: string[]) {
    this.id =uuidv4(),
    this.name = name;
    this.members = members;
    this.krons = krons;
  }

  addMember(userId: string) {
    if (!this.members.includes(userId)) {
      this.members.push(userId);
    }
  }

  removeMember(userId: string) {
    this.members = this.members.filter((id) => id !== userId);
  }

  addKron(kronId: string) {
    this.krons.push(kronId);
  }
}

export class ServerData {
  krons: { id: string, kron: Kron }[]
  groups: {id: string, kronGroup: KronGroup}[]
  users: { tag: string, user: User}[]
  userKrons: {id: string, krons: string[]}[]
  privateKeys: { mail: string, password: string }[]

  public verifyUser(email: string, password: string): boolean {
    const userKey = this.privateKeys.find(
      (key) => key.mail === email && key.password === password
    );
    return userKey !== undefined;
  }

  // Método para obtener un usuario por correo electrónico
  public getUserByEmail(email: string): User | null {
    const userEntry = this.users.find((entry) => entry.user.mail === email);
    return userEntry ? userEntry.user : null;
  }

  public postKron(post: Kron) {

    // Si el Kron pertenece a un grupo, añadirlo al grupo también
    if (post.isGroupKron()) {
      const groupEntry = this.groups.find(entry => entry.id === post.groupId);
      if (groupEntry) {
        groupEntry.kronGroup.addKron(post.id);
      }
    }else{

    // Agregar el Kron a la lista del usuario
    const userKronEntry = this.userKrons.find(entry => entry.id === post.userId);
    if (userKronEntry) {
      userKronEntry.krons.push(post.id);
    } else {
      this.userKrons.push({ id: post.userId, krons: [post.id] });
    }
    }
  }

  getUserKrons(user: User): Kron[] {
    // Encuentra la entrada del usuario en userKrons basada en su id
    const userKronEntry = this.userKrons.find(entry => entry.id === user.tag);
    
    // Si no hay entrada, retorna un array vacío
    if (!userKronEntry) {
        return [];
    }

    // Filtra los krons que pertenecen a este usuario
    return this.krons
        .filter(kronEntry => userKronEntry.krons.includes(kronEntry.id))
        .map(kronEntry => kronEntry.kron);
}
getGroupKrons(group: KronGroup): Kron[] {
  // Encuentra la entrada del grupo en groups basada en su id
  const groupEntry = this.groups.find(entry => entry.id === group.id);

  // Si no hay entrada, retorna un array vacío
  if (!groupEntry) {
      return [];
  }

  // Filtra los krons que pertenecen a este grupo
  return this.krons
      .filter(kronEntry => groupEntry.kronGroup.krons.includes(kronEntry.id))
      .map(kronEntry => kronEntry.kron);
}

}

export class LocalData {
  user: LocalUser;
  currentKrons: string[];
  constructor(user: LocalUser, krons: string[]){
    this.user =user;
    this.currentKrons = krons;
  }

  // Método para validar si el usuario actual es válido
  public isValid(serverData: ServerData): boolean {
    return serverData.verifyUser(this.user.mail, this.user.password);
  }
}

export class ServerDataBuilder {
  private serverData: ServerData;

  constructor() {
    this.serverData = new ServerData();
  }

  public addUser(user: User, tag: string): ServerDataBuilder {
    this.serverData.users.push({ tag, user });
    return this;
  }

  public addPrivateKey(mail: string, password: string): ServerDataBuilder {
    this.serverData.privateKeys.push({ mail, password });
    return this;
  }

  public addKron(kron: Kron): ServerDataBuilder {
    this.serverData.krons.push({ id: kron.id, kron });
    return this;
  }

  public addUserKrons(userId: string, kronIds: string[]): ServerDataBuilder {
    this.serverData.userKrons.push({ id: userId, krons: kronIds });
    return this;
  }

  public addGroup(kronGroup: KronGroup): ServerDataBuilder {
    this.serverData.groups.push({ id: kronGroup.id, kronGroup });
    return this;
  }

  public build(): ServerData {
    return this.serverData;
  }
}