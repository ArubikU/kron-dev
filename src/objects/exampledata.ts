import { ILocalUser, IKronGroup as KronGroup, IUser as KronUser, IServerDataBuilder as ServerDataBuilder } from "./server/interface";
import * as LocalKron from "./server/json-impl";

export const localUserExample: ILocalUser =new LocalKron.LocalKronUser({
    id: "1234-1234-1234-1234",
    name: "John Doe",
    tag: "@johndoe",
    avatar: "default",
    status: "online",
    mbti: "INTJ",
    mail: "test@kron.xyz",
    password: "bestpassword",
    followers: [],
    following: []}
  );
export const starTrekUsers: KronUser[] = [
    new LocalKron.KronUser({
      id: "none",
      name: "James Kirk",
      tag: "@captainkirk",
      avatar: "default",
      status: "online",
      mbti: "ENTP",
      mail: "kirk@enterprise.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Spock",
      tag: "@spock",
      avatar: "default",
      status: "online",
      mbti: "INTJ",
      mail: "spock@enterprise.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Leonard McCoy",
      tag: "@bones",
      avatar: "default",
      status: "dnd",
      mbti: "ESFP",
      mail: "bones@enterprise.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Jean-Luc Picard",
      tag: "@picard",
      avatar: "default",
      status: "dnd",
      mbti: "INFJ",
      mail: "picard@enterprise.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Beverly Crusher",
      tag: "@crusher",
      avatar: "default",
      status: "offline",
      mbti: "ISFJ",
      mail: "crusher@enterprise.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Worf",
      tag: "@worf",
      avatar: "default",
      status: "online",
      mbti: "ISTJ",
      mail: "worf@enterprise.com",
      followers: [],
      following: []
    })
  ];
export const starWarsUsers: KronUser[] = [
    new LocalKron.KronUser({
      id: "none",
      name: "Luke Skywalker",
      tag: "@luke",
      avatar: "default",
      status: "online",
      mbti: "INFP",
      mail: "luke@rebels.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Leia Organa",
      tag: "@leia",
      avatar: "default",
      status: "online",
      mbti: "ENFJ",
      mail: "leia@rebels.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Han Solo",
      tag: "@han",
      avatar: "default",
      status: "dnd",
      mbti: "ESTP",
      mail: "han@smugglers.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Obi-Wan Kenobi",
      tag: "@obiwan",
      avatar: "default",
      status: "dnd",
      mbti: "INFJ",
      mail: "obiwan@jedi.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Darth Vader",
      tag: "@vader",
      avatar: "default",
      status: "offline",
      mbti: "INTJ",
      mail: "vader@empire.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Yoda",
      tag: "@yoda",
      avatar: "default",
      status: "online",
      mbti: "ISTJ",
      mail: "yoda@jedi.com",
      followers: [],
      following: []
    })
  ];
  
export const disneyUsers: KronUser[] = [
    new LocalKron.KronUser({
      id: "none",
      name: "Mickey Mouse",
      tag: "@mickey",
      avatar: "default",
      status: "online",
      mbti: "ESFP",
      mail: "mickey@disney.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Donald Duck",
      tag: "@donald",
      avatar: "default",
      status: "online",
      mbti: "ESTP",
      mail: "donald@disney.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Goofy",
      tag: "@goofy",
      avatar: "default",
      status: "dnd",
      mbti: "ISFP",
      mail: "goofy@disney.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Ariel",
      tag: "@ariel",
      avatar: "default",
      status: "dnd",
      mbti: "INFP",
      mail: "ariel@disney.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Simba",
      tag: "@simba",
      avatar: "default",
      status: "offline",
      mbti: "ENFJ",
      mail: "simba@disney.com",
      followers: [],
      following: []
    }),
    new LocalKron.KronUser({
      id: "none",
      name: "Elsa",
      tag: "@elsa",
      avatar: "default",
      status: "online",
      mbti: "INTJ",
      mail: "elsa@disney.com",
      followers: [],
      following: []
    })
  ];
  
let StarWarsIds = {
    "Luke": starWarsUsers[0],
    "Leia": starWarsUsers[1],
    "Han": starWarsUsers[2],
    "Obi-Wan": starWarsUsers[3],
    "Vader": starWarsUsers[4],
    "Yoda": starWarsUsers[5]
  };
let StarTrekIds = {
    "Kirk": starTrekUsers[0],
    "Spock": starTrekUsers[1],
    "McCoy": starTrekUsers[2],
    "Picard": starTrekUsers[3],
    "Crusher": starTrekUsers[4],
    "Worf": starTrekUsers[5]
  };
let DisneyIds = {
    "Mickey": disneyUsers[0],
    "Donald": disneyUsers[1],
    "Goofy": disneyUsers[2],
    "Ariel": disneyUsers[3],
    "Simba": disneyUsers[4],
    "Elsa": disneyUsers[5]
  };
export const publicPosts: LocalKron.Kron[] = [
    new LocalKron.Kron(
      "none",
      StarWarsIds.Luke.getId(),
      "Just finished training with Yoda. Feeling more powerful than ever! May the Force be with us all. #StarWars #Training",
      new Date().toISOString(),
      [],
      [],
      []
    ),
    new LocalKron.Kron(
      "none",
      StarTrekIds.Kirk.getId(),
      "Had a great day commanding the Enterprise. Exploring new worlds is always thrilling! #StarTrek",
      new Date().toISOString(),
      [],
      [],
      []
    ),
    new LocalKron.Kron(
      "none",
      DisneyIds.Mickey.getId(),
      "Just finished a fun day at Disneyland! Hope everyone is having a magical day! #Disney #Fun",
      new Date().toISOString(),
      [],
      [],
      [],
    ),
    new LocalKron.Kron(
      "none",
      StarWarsIds.Leia.getId(),
      "The Rebellion is stronger than ever! Proud of our progress and excited for what's next. #StarWars #Rebellion",
      new Date().toISOString(),
      [],
      [],
      []
    ),
    new LocalKron.Kron(
      "none",
      StarTrekIds.Picard.getId(),
      "#StarTrek Reflecting on our latest mission. Sometimes, the journey is as important as the destination. #MirroVerse",
      new Date().toISOString(),
      [],
      [],
      []
    ),
    new LocalKron.Kron(
      "none",
      DisneyIds.Elsa.getId(),
      "Winter is coming soon! Excited to see the snow and maybe build a new ice castle. #Disney",
      new Date().toISOString(),
      [],
      [],
      []
    ),
    new LocalKron.Kron(
      "none",
      StarTrekIds.Spock.getId(),
      "Logic and reason guide us through the stars. Today's mission was a success by any measure. #StarTrek #Logic",
      new Date().toISOString(),
      [],
      [],
      []
    ),
    new LocalKron.Kron(
      "none",
      StarWarsIds.Han.getId(),
      "Just made a quick jump to light speed. Sometimes you just have to go fast! #StarWars",
      new Date().toISOString(),
      [],
      [],
      []
    ),
    new LocalKron.Kron(
      "none",
      DisneyIds.Goofy.getId(),
      "Gawrsh! Had a great time at the park today. Always fun to hang out with friends. #Disney",
      new Date().toISOString(),
      [],
      [],
      []
    ),
    new LocalKron.Kron(
      "none",
      StarWarsIds.Yoda.getId(),
      "Much to learn, you still have. Continue the journey, we must. #StarWars",
      new Date().toISOString(),
      [],
      [],
      []
    )
  ];
  
export const groups: KronGroup[] = [
    new LocalKron.KronGroup(
      "none",
      "Galactic Heroes Unite",
      [
        StarWarsIds.Luke.getId(),
        StarWarsIds.Leia.getId(),
        DisneyIds.Mickey.getId(),
        DisneyIds.Elsa.getId(),
        StarTrekIds.Kirk.getId(),
        StarTrekIds.Spock.getId()
      ],
      [],
    ),
    new LocalKron.KronGroup(
      "none",
      "Rebels, Captains & Royals",
      [
        StarWarsIds.Leia.getId(),
        StarTrekIds.Picard.getId(),
        DisneyIds.Ariel.getId(),
        DisneyIds.Goofy.getId(),
        StarTrekIds.Worf.getId()
      ],
      [],
    ),
    new LocalKron.KronGroup(
      "none",
      "Interstellar & Magical Diplomats",
      [
        StarWarsIds["Obi-Wan"].getId(),
        StarWarsIds.Yoda.getId(),
        DisneyIds.Simba.getId(),
        DisneyIds.Ariel.getId(),
        StarTrekIds.Picard.getId()
      ],
      [],
    ),
    new LocalKron.KronGroup(
      "none",
      "Space Adventurers & Dreamers",
      [
        StarWarsIds.Han.getId(),
        StarTrekIds.Kirk.getId(),
        DisneyIds.Donald.getId(),
        DisneyIds.Elsa.getId(),
        StarTrekIds.McCoy.getId()
      ],
      [],
    ),
    new LocalKron.KronGroup(
      "none",
      "Heroes of the Multiverse",
      [
        StarWarsIds.Luke.getId(),
        DisneyIds.Mickey.getId(),
        StarTrekIds.Spock.getId(),
        DisneyIds.Goofy.getId(),
        StarTrekIds.Worf.getId()
      ],
      [],
    )
  ];
  
export var groupPosts: LocalKron.Kron[] = [
  ]
  
  groups[0].addMember(localUserExample.getId())
  
  groups.forEach(group =>{
    group.getMembers().forEach(memberId =>{
      
      let tempKron = new LocalKron.Kron(
        "none",
        memberId,
        "I just joined to "+group.getName(),
        new Date().toISOString(),
        [],
        [],
        [],
      )
      tempKron.setGroupId(group.getId());
      groupPosts.push(tempKron);
    })
  })
  export var BuilderServer: ServerDataBuilder = new LocalKron.JsonServerDataBuilder();
  BuilderServer.addUser(localUserExample,localUserExample.getTag());
  starTrekUsers.forEach(u => BuilderServer.addUser(u,u.getTag()));
  starWarsUsers.forEach(u => BuilderServer.addUser(u,u.getTag()));
  disneyUsers.forEach(u => BuilderServer.addUser(u,u.getTag()));
  export var serverDataState = BuilderServer.build();
  groups.forEach(g => serverDataState.addGroup(g));
  publicPosts.forEach(p => serverDataState.postKron(p));
  groupPosts.forEach(p => serverDataState.postKron(p));