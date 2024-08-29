import {
  BellIcon,
  BookmarkIcon,
  CheckIcon,
  FlameKindling,
  FolderIcon,
  HashIcon,
  HeartIcon,
  HomeIcon,
  ImageIcon,
  LinkIcon,
  MessageCircleIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
  XIcon
} from "lucide-react";
import * as React from "react";
import {
  SearchIcon
} from "../src/components/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../src/components/ui/avatar";
import { Button } from "../src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../src/components/ui/card";
import { Input } from "../src/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../src/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../src/components/ui/tabs";
import { Textarea } from "../src/components/ui/textarea";

import { buttonColors, mbtiColors } from "../src/objects/colors";
import { ILocalUser, IKronGroup as KronGroup, IKron as KronPost, IUser as KronUser, LocalData, IServerDataBuilder as ServerDataBuilder } from "../src/objects/server/interface";
import * as LocalKron from "../src/objects/server/json-impl";
import KronImages from "./components/image/kronImage";
import { formatTimestamp } from "./lib/utils";

const localUserExample: ILocalUser =new LocalKron.LocalKronUser({
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
const starTrekUsers: KronUser[] = [
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
const starWarsUsers: KronUser[] = [
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

const disneyUsers: KronUser[] = [
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
const publicPosts: LocalKron.Kron[] = [
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

const groups: KronGroup[] = [
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

const groupPosts: LocalKron.Kron[] = [
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
const BuilderServer: ServerDataBuilder = new LocalKron.JsonServerDataBuilder();
BuilderServer.addUser(localUserExample,localUserExample.getTag());
starTrekUsers.forEach(u => BuilderServer.addUser(u,u.getTag()));
starWarsUsers.forEach(u => BuilderServer.addUser(u,u.getTag()));
disneyUsers.forEach(u => BuilderServer.addUser(u,u.getTag()));
const serverDataState = BuilderServer.build();
groups.forEach(g => serverDataState.addGroup(g));
publicPosts.forEach(p => serverDataState.postKron(p));
groupPosts.forEach(p => serverDataState.postKron(p));
export default function Component() {
  const [localDataT,updateLocal] = React.useState(new LocalData(localUserExample,[]));
  let localData = localDataT;
  const [serverDataT,updateServer] = React.useState(serverDataState);
  let serverData = serverDataT;

  const [render, forceRender] = React.useState(1);
  console.log(window.location.href)

  function update(local,server){
    updateLocal(local)
    updateServer(server)
    localData = local;
    serverData = server;
    console.log(local)
    console.log(server)
    forceRender(render+1)
  }



  const KronicleLogo = () => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="#FCAE1E" />
      <path
        d="M10 30V10H15L20 15L25 10H30V30H25V17.5L20 22.5L15 17.5V30H10Z"
        fill="#960018"
      />
    </svg>
  );

  const StatusIndicator = ({ status, isInteractable = true }) => {
    const statusColors = {
      online: "bg-green-500",
      offline: "bg-gray-500",
      dnd: "bg-red-500",
      afk: "bg-orange-500"
    }

    const indicator = (
      <div className={`w-4 h-4 rounded-full ${statusColors[status]} absolute bottom-0 right-0 border-2 border-[#960018] transform translate-x-1/3 translate-y-1/3 z-10`} />
    )

    return isInteractable ? (
      <Popover>
        <PopoverTrigger asChild >
          {indicator}
        </PopoverTrigger>
        <PopoverContent style={{ backgroundColor: 'transparent', padding: '10px', borderRadius: '-1px' , borderColor: "transparent", borderBlockEndColor: "transparent" , border: "transparent", boxShadow: "none"}}>
          <Select value={status} onValueChange={(e) => {handleStatusChange(e)
            update(localData,serverData)
          }
          }>
            <SelectTrigger className=" bg-[#960018] rounded-md border-transparent" style={{color: "#FFBF00"}} >
             <SelectValue placeholder="Set status" />
            </SelectTrigger>
            
            <SelectContent className="bg-[#960018] rounded-md border-transparent" style={{color: "#FFBF00", }}>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="afk">AFK</SelectItem>
              <SelectItem value="dnd">Do Not Disturb</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>
    ) : indicator
  }

  const MbtiOverlay = ({ mbti }) => (
    <div
      className="absolute inset-0 rounded-full border-2 z-0"
      style={{ borderColor: mbtiColors[mbti] || "transparent" }}
    />
  );

  const handleStatusChange = async (newStatus) => {
    if (newStatus === localData.getUser().getStatus()) {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        localData.setUserIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
        localData.setUserIp("Unable to fetch IP");
      }
    } else {
      localData.setUserIp("");
    }
    localData.getUser().setStatus(newStatus)
    serverData.updateKronUser(localData.getUser());
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      localData.setNewKronImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        localData.setNewKronImagePreview(reader.result);
        update(localData,serverData)
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostKron = () => {
    if (localData.newKronContent.trim() || localData.newKronImage) {
      const kronBuilder = new LocalKron.Kron(
        "none",
        localData.getUser().getId(),
        localData.newKronContent,
        new Date().toISOString(),
        [],
        [],
        [],
        []
      );
      if(localData.newKronImage){
        kronBuilder.setImage(URL.createObjectURL(localData.newKronImage))
      }
      kronBuilder.setTags(localData.newKronContent.match(/#\w+/g) || []);
      serverData.postKron(kronBuilder)


      localData.setNewKronContent("");
      localData.setNewKronImage(null);
      localData.setNewKronImagePreview("");
      // In a real application, you would send this data to the server here
    }
  };

  const handleKronActions = (action, kron: KronPost): boolean => {
    switch(action){
      case "Comment":{
        localData.setActiveComments(localData.activeComments === kron.getId() ? null : kron.getId());
        break
      }
      case "ReKron": {

        localData.getUser().addRekron(kron)
        kron.reKron(localData.getUser())

        break
      }
      case "Like": {
        if(kron){
          if(kron.liking(localData.getUser())){
            kron.unlike(localData.getUser())
          }else{
            kron.like(localData.getUser())
          }
        }
        break
      }
      case "Save": {
        if(localData.getUser().getMarkers().includes(kron.getId())){
          localData.getUser().removeMarker(kron)
        }else{
          localData.getUser().addMarker(kron)
        }
      }
    }
    return true;
  };

  const handlePostComment = (kronId) => {
    if (localData.newComment.trim()) {
      const kron = serverData.getAllKrons().find((k) => k.id === kronId)?.kron;
      if (kron) {
        
      const kronBuilder = new LocalKron.Kron(
        "none",
        localData.getUser().getId(),
        localData.newKronContent,
        new Date().toISOString(),
        [],
        [],
        [],
        []
      );
      if(localData.newKronImage){
        kronBuilder.setImage(URL.createObjectURL(localData.newKronImage))
      }
      kronBuilder.setTags(localData.newKronContent.match(/#\w+/g) || []);
      kronBuilder.setCommentParent(kronId);
      serverData.postKron(kronBuilder)
      localData.setNewComment("");
        // In a real application, you would send this data to the server here
      }
    }
  };

  const handleCopyKronUrl = (kronId: string) => {
    
    const url = `${window.location.origin}/kron/id=${kronId}`;
    navigator.clipboard.writeText(url);
    localData.setCopiedKronId(kronId);
    setTimeout(() => {localData.setCopiedKronId("")
      update(localData,serverData)
    }, 2000);
  };

  const renderImagePreview = (url) => {
    return (
      <div className="mt-2 relative">
        <button
          className="text-white p-1"
          onClick={() => {localData.setNewKronImagePreview("")
            update(localData,serverData)
          }}
        >
        <img src={url} alt="Preview" className="max-w-full h-auto" />
          <XIcon className="h-4 w-4 mt-2 relative" />
        </button>
      </div>
    );
  };

  const renderUrlPreview = (url) => {
    if(url == null) return;
    // This is a simple implementation. In a real-world scenario, you'd want to fetch metadata for the URL
    return (
      <div className="mt-2 border rounded p-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          {url}
        </a>
      </div>
    );
  };

  const showKronStat=(action)=>{
    if(action.name==="Save"){
      return null;
    }
    return (action.count <= 0  )? null: action.count;
  }

  const showKronStatClass=(action)=>{
    if(action.name==="Save" && (action.count > 0)){
      return "h-5 w-5 fill-white";
    }
    return (action.count <= 0) ? "h-5 w-5 ": "h-5 w-5 mr-1 fill-white";
  }

  const normalWord = (word: string) => (<span className="text-[#FFF6E9] inline"> {word} </span>);
  const tagWord = (word: string) => (<button className="text-blue-400 text-sm inline" onClick={(e)=>{
    localData.setActiveView("explore")
    localData.setSearchTerm(word)
    update(localData,serverData)
  }}> {word} </button>);

  const hrlink = (word: string)=>(<a className="text-blue-400 text-sm inline" href={word}> {word} </a>)

  const renderCarousel = (words: string[]) => {
    let images = words.filter(word =>{
      if(word.includes("blob:"))  {
        return true;
      }
      if(word.match(/https?:\/\/[^\s]+/)== null)  {
        return false;
      }
      if (word.includes("youtube.com") || word.includes("youtu.be")) {
        return true;
      }
      if(word.match(/\.(jpeg|jpg|gif|png|webp|mp4)$/) == null &&
    word.match(/format=(jpeg|jpg|gif|png|webp|mp4)/)== null ){
        return false;
      };
      return word;
    })

    if(images.length == 0){
      return (<span></span>);
    }
    return(KronImages(images))
  }

  const renderKronContent = (kron: KronPost) => {
    // Split the content into words
    let kronContent = kron.getContent().replace(/(?:\r\n|\r|\n)/g, '  ');
    let words = kronContent.split(' ');
    let wordsWithImage= words;
    let kronImage = kron.getImage();
    if(kronImage){
      wordsWithImage.push(kronImage)
    }
    console.log(wordsWithImage)
    return (
      <div>
        {words.map((word, index) => {
          if (word.startsWith('#')) {
            return tagWord(word);
          } else if (word.match(/https?:\/\/[^\s]+/)) {
            if (word.includes("youtube.com") || word.includes("youtu.be")) {
              return hrlink(word);
            } else if (word.match(/\.(jpeg|jpg|gif|png|webp|mp4)$/) !== null) {
              return hrlink(word);
            } else {
              return hrlink(word);
            }
          } else {
            return normalWord(word);
          }
        })}

      {renderCarousel(wordsWithImage)}
      </div>
    );
  };
  

  class kronConfig {
    showFollowing?: Boolean;
    showAvatar?: Boolean;
    showTag?: Boolean;
    showTime?: boolean;
  }
  const renderKron = (kron: KronPost, index, config: kronConfig= {showFollowing: true,showAvatar: true,showTag: true,showTime: true}) => {
    const user: KronUser =
      serverData.getAllUsers().find((u) => u.user.getId() === kron.getUserId())?.user ||
      localData.getUser();
    return (
      <Card
        key={kron.getId()}
        className="mb-4 bg-[#FFF6E9]/10 backdrop-blur-md border-[#FFF6E9]/20 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <CardHeader className="flex flex-row items-center justify-between">
          {(config.showAvatar || config.showTag) && (<div className="flex items-center">
            
            {config.showAvatar && (<div className="relative mr-2"><Avatar className="w-10 h-10 border-2 border-[#FCAE1E]">
              <AvatarImage src={user.getAvatar()} alt={user.getName()} />
              <AvatarFallback>{user.getName().split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar><StatusIndicator status={user.getStatus()} isInteractable={user.getId() === localData.getUser().getId()} /><MbtiOverlay mbti={user.getMbti()} /></div>)}
          
          
            {config.showTag && (<div><span className="font-bold text-[#FFF6E9]">{user.getName()}</span> {config.showTime && (<span className="text-sm text-[#FFF6E9]/60">{formatTimestamp(kron.getTimestamp())}</span>)}<p className="text-sm text-[#FFF6E9]/60">{user.getTag()}</p></div>)}
          
        </div>)}
          {user.getId() !== localData.getUser().getId() 
          && config?.showFollowing
          && (
            <Button
              variant="outline"
              size="sm"
              className="text-[#FFF6E9] border-[#FFF6E9] hover:bg-[#FFF6E9]/10"
                onClick={(e) =>{
                  if(!localData.getUser().getFollowing().includes(user.getId())){
                    localData.getUser().getFollowing().unshift(user.getId())
                  }else{
                    localData.getUser().setFollowing(
                      localData.getUser().getFollowing().filter((k)=>k!=user.getId())
                    )
                  }
                  update(localData,serverData)
                }}
            >
              <UserPlusIcon className="h-4 w-4 mr-1" />
              {localData.getUser().getFollowing().includes(user.getId()) ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {renderKronContent(kron)}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex gap-4">
            {[
              {
                name: "Comment",
                icon: MessageCircleIcon,
                count: kron.getComments().length,
              },
              { name: "ReKron", icon: FlameKindling, count: kron.getRekrons().length },
              { name: "Like", icon: HeartIcon, count: kron.getLikes().length },
              { name: "Save", icon: BookmarkIcon, count: localData.getUser().getMarkers().filter(
                (k)=>k===kron.getId()
              ).length },
            ].map((action, actionIndex) => (
              <Button
                key={action.name}
                variant="ghost"
                size="sm"
                className={`p-2 text-[#FFF6E9] transition-colors duration-200 ${buttonColors[(index + actionIndex) % buttonColors.length].bg
                  } ${buttonColors[(index + actionIndex) % buttonColors.length]
                    .hover
                  } bg-opacity-50 hover:bg-opacity-75`}
                aria-label={action.name}
                onClick={(e) =>{
                  handleKronActions(action.name,kron)
                  update(localData,serverData)
                }
                }
              >
                <action.icon className={showKronStatClass(action)} />
                <span>{showKronStat(action)}</span>
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#FFF6E9]"
            onClick={() => {handleCopyKronUrl(kron.getId())
              update(localData,serverData)
            }}
          >
            {localData.copiedKronId === kron.getId() ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <LinkIcon className="h-5 w-5" />
            )}
          </Button>
        </CardFooter>
        {localData.activeComments === kron.getId() && (
          <div className="px-4 pb-4">
            <Input
              placeholder="Add a comment..."
              onChange={(e) => {localData.setNewComment((e.target as HTMLInputElement).value)
                update(localData,serverData)
              }}
              value={localData.newComment}
              className="mb-2 bg-[#FFF6E9]/10 border-[#FFF6E9]/20 text-[#FFF6E9] placeholder-[#FFF6E9]/60"
            />
            <Button onClick={() => {handlePostComment(kron.getId())
              update(localData,serverData)
            }} className="mb-4">
              Post Comment
            </Button>
            {kron.getComments().map((comment, index) => {
              const commentUser =
                serverData.getAllUsers().find((u) => u.id === comment.getUserId())?.user ||
                localData.getUser();
              return (
                <div key={comment.getId()} className="mb-2 last:mb-0">
                  <div className="flex items-center mb-1">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage
                        src={commentUser.getAvatar()}
                        alt={commentUser.getName()}
                      />
                      <AvatarFallback>
                        {commentUser.getName()
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm">
                      {commentUser.getName()}
                    </span>
                  </div>
                  <p className="text-sm ml-8">{comment.getContent()}</p>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    );
  };

  const renderUser = (user: KronUser, config?: kronConfig) => {
    return (<div key={user.getId()} className="mb-4 flex items-center">
    <Button
      variant="ghost"
      className={``}
      onClick={() => {localData.setActiveView("profile")
        localData.setSelectedUser(user)
        update(localData,serverData)
      }}
    >
      <Avatar className="w-12 h-12 mr-4">
        <AvatarImage src={user.getAvatar()} alt={user.getName()} />
        <AvatarFallback>
          {user.getName()
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      </Button>
      <div>
        <p className="font-bold">{user.getName()}</p>
        <p className="text-[#FFF6E9]/60">{user.getTag()}</p>
      </div>
    </div>)
  }
  const renderExploreContent = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <SearchIcon className="text-[#FFF6E9]/60" />
          <Input
            type="text"
            placeholder="Search..."
            className="flex-grow bg-[#FFF6E9]/10 border-[#FFF6E9]/20 text-[#FFF6E9] placeholder-[#FFF6E9]/60"
            onChange={(e)=>{
              localData.setSearchTerm(e.target.value)
              update(localData,serverData)
            }}
            value={localData.searchTerm}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Suggested Tags</h3>
          <div className="flex flex-wrap gap-2">
            {serverData.getSuggestedTags().map((tag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="bg-[#FFF6E9]/10 hover:bg-[#FFF6E9]/20 text-[#FFF6E9]"
                onClick={() => {
                  localData.setSearchTerm(localData.searchTerm+" "+tag)
                  update(localData,serverData)
                }}
              >
                <HashIcon className="w-4 h-4 mr-1" />
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <Tabs onValueChange={(e)=>{
          localData.setActiveSearchTab(e);
          update(localData,serverData)
        }} value={localData.activeSearchTab} >
          <TabsList className="bg-[#960018]/60">
            <TabsTrigger value="posts" className="text-[#FFF6E9]">Posts</TabsTrigger>
            <TabsTrigger value="users" className="text-[#FFF6E9]">Users</TabsTrigger>
            <TabsTrigger value="groups" className="text-[#FFF6E9]">Groups</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            {serverData.filterPosts(localData.searchTerm).filter(kron =>{
          return !kron.isCommentKron() && !kron.isGroupKron()
        }).map((kron, index) => renderKron(kron, index))}
          </TabsContent>
          <TabsContent value="users">
            {serverData.filterUsers(localData.searchTerm).map((user, index) => (
              <Card key={index} className="mb-4 bg-[#FFF6E9]/10 backdrop-blur-md border-[#FFF6E9]/20">
                <CardHeader className="flex flex-row items-center">
                  <Avatar className="w-10 h-10 mr-2">
                    <AvatarImage src={user.getAvatar()} alt={user.getName()} />
                    <AvatarFallback>{user.getName().split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.getName()}</h3>
                    <p className="text-sm text-[#FFF6E9]/60">{user.getTag()}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="groups">
            {serverData.filterGroups(localData.searchTerm).map((group, index) => (
              <Card key={index} className="mb-4 bg-[#FFF6E9]/10 backdrop-blur-md border-[#FFF6E9]/20">
                <CardHeader>
                  <h3 className="font-semibold">{group.getName()}</h3>
                  <p className="text-sm text-[#FFF6E9]/60">{group.getMembers().length} members</p>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    )
  }
  const renderContent = () => {
    switch (localData.activeView) {
      case "home":
        return serverData.getAllKrons().filter(kron =>{
          return !kron.kron.isCommentKron() && !kron.kron.isGroupKron()
        })
        
        .map((kron, index) =>
          renderKron(kron.kron, index)
        );
      case "group":
        if (localData.selectedGroup) {
          return serverData.getGroupKrons(localData.selectedGroup).map((kron, index) => renderKron(kron, index));
        }
        return <p>Select a group to view krons</p>;
      case "bookmarks":
        let userKrons = serverData.getAllKrons().filter(
          (kron) => localData.getUser().getMarkers().includes(kron.id)
        );
        userKrons=userKrons.filter((k)=>{
          if(k.kron.getGroupId() != undefined){
            let id: string = k.kron.getGroupId()+"";
          return serverData.getGroup(id)?.getMembers().includes(localData.getUser().getId())
          }
          return true;
        })
        return userKrons.map((kron, index) =>
          renderKron(kron.kron, index)
        );

      case "profile":
        if (localData.selectedUser) {
          let selUser: KronUser = localData.selectedUser;
          let userKrons = serverData.getAllKrons().filter(
            (kron) => kron.kron.getUserId() === selUser.getId()||localData.selectedUser?.getRekrons().includes(kron.id)
          );
          if(localData.selectedUser.getId()!=localData.getUser().getId()){
            userKrons=userKrons.filter((k)=>{
              if(k.kron.getGroupId() != undefined){
                let id: string = k.kron.getGroupId()+"";
              return serverData.getGroup(id)?.getMembers().includes(localData.getUser().getId())
              }
              return true;
            })
          }
          return (
            <div>
              <div className="mb-4 flex items-center">
                <Avatar className="w-16 h-16 mr-4">
                  <AvatarImage
                    src={selUser.getAvatar()}
                    alt={selUser.getName()}
                  />
                  <AvatarFallback>
                    {selUser.getName()
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{selUser.getName()}</h2>
                  <p className="text-[#FFF6E9]/60">{selUser.getTag()}</p>
                </div>
              </div>
              {userKrons.map((kron, index) => renderKron(kron.kron, index,{showFollowing: false,showTag: true,showAvatar:true,showTime: true}))}
            </div>
          );
        }
        return <p>Select a user to view their profile</p>;
      case "following":
        var followingUsers: KronUser[] = [];
        serverData.getAllUsers().forEach((k)=>{
          if(localData.getUser().getFollowing().includes(k.user.getId())){
            followingUsers.push(k.user)
          }
        })
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Following</h2>
            {followingUsers.map((u) => renderUser(u))}
          </div>
        );
      case "explore":
          return renderExploreContent()
      default:
        return <p>Select a view</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#960018] via-[#C8442C] to-[#FCAE1E] text-[#FFF6E9]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#FFF6E9]/20 p-4 bg-[#960018]/80 backdrop-blur-md flex flex-col">
        <div className="flex items-center mb-8">
          <KronicleLogo />
          <span className="text-xl font-bold text-[#FFF6E9] ml-2">
            Kronicle
          </span>
        </div>
        <nav className="flex-grow">
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[0].bg} ${buttonColors[0].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {
              localData.setActiveView("home")
              localData.setSelectedGroup(null)
              update(localData,serverData)}}
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[1].bg} ${buttonColors[1].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("explore")
              update(localData,serverData)
            }}
          >
            <SearchIcon className="mr-2 h-4 w-4" />
            Explore
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[2].bg} ${buttonColors[2].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("notifications")
              update(localData,serverData)
            }}
          >
            <BellIcon className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[3].bg} ${buttonColors[3].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("messages")
              update(localData,serverData)
            }}
          >
            <MessageCircleIcon className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[4].bg} ${buttonColors[4].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("bookmarks")
              update(localData,serverData)
            }}
          >
            <BookmarkIcon className="mr-2 h-4 w-4" />
            Bookmarks
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[5].bg} ${buttonColors[5].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("profile")
              localData.setSelectedUser(localData.getUser())
              update(localData,serverData)
            }}
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[6].bg} ${buttonColors[6].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("following")
              update(localData,serverData)
            }}
          >
            <UsersIcon className="mr-2 h-4 w-4" />
            Following
          </Button>
          <div className="mt-4 mb-2 text-[#FFF6E9]/60 font-semibold">Groups</div>
          {serverData.getAllGroups().filter(group => group.kronGroup.getMembers().includes(localData.getUser().getId())).map((group, index) => (
            <Button
              key={group.id}
              variant="ghost"
              className={`w-full justify-start mb-2 text-black ${buttonColors[index % buttonColors.length].bg} ${buttonColors[index % buttonColors.length].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
              onClick={() => {
                localData.setSelectedGroup(group.kronGroup)
                localData.setActiveView("group")
                update(localData,serverData)
              }}
            >
              <FolderIcon className="mr-2 h-4 w-4" />
              {group.kronGroup.getName()}
            </Button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-[#FFF6E9]/20">
          <div className="flex items-center mb-2">
            <div className="relative mr-2">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={localData.getUser().getAvatar()}
                  alt={localData.getUser().getName()}
                />
                <AvatarFallback>
                  {localData.getUser().getName()
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <StatusIndicator status={localData.getUser().getStatus()} />
              <MbtiOverlay mbti={localData.getUser().getMbti()} />
            </div>
            <div>
              <p className="font-semibold text-[#FFF6E9]">
                {localData.getUser().getName()}
              </p>
              <p className="text-xs text-[#FFF6E9]/60">
                {localData.getUser().getTag()}
              </p>
            </div>
          </div>
          {localData.userIp && (
            <p className="mt-2 text-xs text-[#FFF6E9]/60">Your IP: {localData.userIp}</p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-[#960018]/80 backdrop-blur-md text-[#FFF6E9] p-4 sticky top-0 z-10">
          <h1 className="text-xl font-bold">{"Kronicle "+localData.getTittle()}</h1>
        </header>

        {/* Kron input */}
        <div className="p-4 border-b border-[#FFF6E9]/20 bg-[#960018]/60 backdrop-blur-md">
          <Textarea
            className="w-full mb-2 bg-[#FFF6E9]/10 border-[#FFF6E9]/20 text-[#FFF6E9] placeholder-[#FFF6E9]/60"
            placeholder="What's happening in your Kronicle?"
            onChange={(e) => {localData.setNewKronContent(e.target.value)
              update(localData,serverData)
            }}
            value={localData.newKronContent}
          />
          {localData.newKronImagePreview && renderImagePreview(localData.newKronImagePreview)}
          <div className="flex justify-between items-center mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageUpload(e)
              }}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <ImageIcon className="h-6 w-6 text-[#FFF6E9]" />
            </label>
            <Button
              className={`text-[#FFF6E9] transition-all duration-300 shadow-md hover:shadow-lg ${buttonColors[2].bg} ${buttonColors[2].hover}`}
              onClick={()=>{
                handlePostKron()
                localData.setActiveView("home")
                update(localData,serverData)
              }}
            >
              Post Kron
            </Button>
          </div>
        </div>

        {/* Kron Feed */}
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
}
