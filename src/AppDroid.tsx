


import {
  BookmarkIcon,
  CheckIcon,
  FlameIcon,
  HeartIcon,
  ImageIcon,
  LinkIcon,
  MessageCircleIcon,
  UserPlusIcon,
  XIcon
} from "lucide-react"
import * as React from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../src/components/ui/avatar"
import { Button } from "../src/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../src/components/ui/card"
import { Input } from "../src/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../src/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/components/ui/select"
import { Textarea } from "../src/components/ui/textarea"

import { mbtiColors, statusColors } from "./objects/colors"

import { IKron as KronPost, IUser as KronUser, LocalData } from "../src/objects/server/interface"
import * as LocalKron from "../src/objects/server/json-impl"
import * as KronUtils from "./lib/KronUtils"
import { kronConfig, renderMobileSheet } from "./lib/KronUtils"
import { formatMobileTimestamp } from "./lib/utils"
import * as Example from "./objects/exampledata"




import { ScrollArea } from "../src/components/ui/scroll-area"





export default function Component() {

  const [localDataT, updateLocal] = React.useState(new LocalData(Example.localUserExample, []));
  let localData = localDataT;
  const [serverDataT, updateServer] = React.useState(Example.serverDataState);
  let serverData = serverDataT;

  const [kronContent, setKronContent] = React.useState("")



  const [render, forceRender] = React.useState(1);

  function update(local, server, reason?: string) {
    updateLocal(local)
    updateServer(server)
    localData = local;
    serverData = server;
    console.log("Updated by: "+reason)
    forceRender(render + 1)
  }
  
  const StatusIndicator = ({ status, isInteractable = true }) => {
  
    const indicator = (
      <div className={`w-4 h-4 rounded-full ${statusColors[status]} absolute bottom-0 right-0 border-2 ${localData.getTheme().borderMainColor} transform translate-x-1/3 translate-y-1/3 z-10`} />
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
            <SelectTrigger className={` ${localData.getTheme().mainColor} rounded-md border-transparent ${localData.getTheme().fullTextColorStyleTwo}`}  >
             <SelectValue content="Set status" />
            </SelectTrigger>
            
            <SelectContent className={`${localData.getTheme().mainColor} rounded-md border-transparent ${localData.getTheme().fullTextColorStyleTwo}`}>
              <SelectItem value={`online`}>Online</SelectItem>
              <SelectItem value={`afk`}>AFK</SelectItem>
              <SelectItem value={`dnd`}>Do Not Disturb</SelectItem>
              <SelectItem value={`offline`}>Offline</SelectItem>
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>
    ) : indicator
  }
  const MbtiOverlay = ({ mbti }) => (
    <div
      className={`absolute inset-0 rounded-full border-2 z-0`}
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
    if (kronContent.trim() || localData.newKronImage) {
      const kronBuilder = new LocalKron.Kron(
        "none",
        localData.getUser().getId(),
        kronContent,
        new Date().toISOString(),
        [],
        [],
        [],
        []
      );
      if(localData.newKronImage){
        kronBuilder.setImage(URL.createObjectURL(localData.newKronImage))
      }
      kronBuilder.setTags(kronContent.match(/#\w+/g) || []);
      serverData.postKron(kronBuilder)


      setKronContent("");
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
      <div className={`mt-2 relative`}>
        <button
          className={`text-white p-1`}
          onClick={() => {
            localData.setNewKronImagePreview("")
            update(localData, serverData)
          }}
        >
          <img src={url} alt="Preview" className={`max-w-full h-auto`} />
          <XIcon className={`h-4 w-4 mt-2 relative`} />
        </button>
      </div>
    );
  };


  const renderKron = (kron: KronPost, index, config: kronConfig= {showFollowing: true,showAvatar: true,showTag: true,showTime: true}) => {
    const user: KronUser =
      serverData.getAllUsers().find((u) => u.user.getId() === kron.getUserId())?.user ||
      localData.getUser();
    return (
      <Card
        key={kron.getId()}
        className={`mb-4  ${localData.getTheme().kronShadow} backdrop-blur-md  ${localData.getTheme().borderWither} overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}
      >
        <CardHeader className={`flex flex-row items-center justify-between`}>
          {(config.showAvatar || config.showTag) && (<div className={`flex items-center`}>
            
            {config.showAvatar && (<div className={`relative mr-2`}><Avatar className={`w-10 h-10 border-2 ${localData.getTheme().borderContrast4}`}>
              <AvatarImage src={user.getAvatar()} alt={user.getName()} />
              <AvatarFallback>{user.getName().split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar><StatusIndicator status={user.getStatus()} isInteractable={user.getId() === localData.getUser().getId()} /><MbtiOverlay mbti={user.getMbti()} /></div>)}
          
          
            {config.showTag && (<div><span className={`font-bold  ${localData.getTheme().fullTextColor}`}>{user.getName()}</span> {config.showTime && (<span className={`text-sm  ${localData.getTheme().textColor}`}>{formatMobileTimestamp(kron.getTimestamp())}</span>)}<p className={`text-sm  ${localData.getTheme().textColor}`}>{user.getTag()}</p></div>)}
          
        </div>)}
          {user.getId() !== localData.getUser().getId() 
          && config?.showFollowing
          && (
            <Button
              variant="outline"
              size="sm"
              className={` ${localData.getTheme().fullTextColor}  ${localData.getTheme().borderColor} ${localData.getTheme().hoverKronShadow}`}
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
              <UserPlusIcon className={`h-4 w-4 mr-1`} />
              {localData.getUser().getFollowing().includes(user.getId()) ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </CardHeader>
        <CardContent className="overflow-visible">
          {KronUtils.renderKronContent(kron,localData,serverData,update)}
        </CardContent>
        <CardFooter className={`flex justify-between items-center`}>
          <div className={`flex gap-4`}>
            {[
              {
                name: "Comment",
                icon: MessageCircleIcon,
                count: kron.getComments().length,
              },
              { name: "ReKron", icon: FlameIcon, count: kron.getRekrons().length },
              { name: "Like", icon: HeartIcon, count: kron.getLikes().length },
              { name: "Save", icon: BookmarkIcon, count: localData.getUser().getMarkers().filter(
                (k)=>k===kron.getId()
              ).length },
            ].map((action, actionIndex) => (
              <Button
                key={action.name}
                variant="ghost"
                size="sm"
                className={`p-2  ${localData.getTheme().fullTextColor} transition-colors duration-200 ${localData.getTheme().buttons[( actionIndex) % localData.getTheme().buttons.length].bg
                  } ${localData.getTheme().buttons[(actionIndex) % localData.getTheme().buttons.length]
                    .hover
                  } bg-opacity-50 hover:bg-opacity-75`}
                aria-label={action.name}
                onClick={(e) =>{
                  handleKronActions(action.name,kron)
                  update(localData,serverData)
                }
                }
              >
                <action.icon className={KronUtils.showKronStatClass(action,localData.getTheme())} />
                <span>{KronUtils.showKronStat(action)}</span>
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={` ${localData.getTheme().fullTextColor}`}
            onClick={() => {handleCopyKronUrl(kron.getId())
              update(localData,serverData)
            }}
          >
            {localData.copiedKronId === kron.getId() ? (
              <CheckIcon className={`h-5 w-5`}/>
            ) : (
              <LinkIcon className={`h-5 w-5`} />
            )}
          </Button>
        </CardFooter>
        {localData.activeComments === kron.getId() && (
          <div className={`px-4 pb-4`}>
            <Input
              placeholder="Add a comment..."
              onChange={(e) => {localData.setNewComment((e.target as HTMLInputElement).value)
                update(localData,serverData)
              }}
              value={localData.newComment}
              className={`mb-2  ${localData.getTheme().kronShadow}  ${localData.getTheme().borderWither}  ${localData.getTheme().textColor}  ${localData.getTheme().placeholderTranslucent}`}
            />
            <Button onClick={() => {handlePostComment(kron.getId())
              update(localData,serverData)
            }} className={`mb-4 ${localData.getTheme().fullTextColor}`}>
              Post Comment
            </Button>
            {kron.getComments().map((comment, index) => {
              const commentUser =
                serverData.getAllUsers().find((u) => u.id === comment.getUserId())?.user ||
                localData.getUser();
              return (
                <div key={comment.getId()} className={`mb-2 last:mb-0`}>
                  <div className={`flex items-center mb-1`}>
                    <Avatar className={`w-6 h-6 mr-2`}>
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
                    <span className={`font-semibold text-sm`}>
                      {commentUser.getName()}
                    </span>
                  </div>
                  <p className={`text-sm ml-8`}>{comment.getContent()}</p>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    );
  };

  const renderContent = () => {
    switch (localData.activeView) {
      case "home":
        return serverData.getAllKrons().filter(kron =>{
          return !kron.kron.isCommentKron() && !kron.kron.isGroupKron()
        })
        
        .map((kron, index) =>
          renderKron(kron.kron, index)
        );
      case "explore":
        return <div className={`text-primary`}>Explore content goes here</div>
      case "notifications":
        return <div className={`text-primary`}>Notifications content goes here</div>
      case "messages":
        return <div className={`text-primary`}>Messages content goes here</div>
      case "bookmarks":
        return <div className={`text-primary`}>Bookmarks content goes here</div>
      case "profile":
        return <div className={`text-primary`}>Profile content goes here</div>
      default:
        return <div className={`text-primary`}>Select a view</div>
    }
  }

  function renderPage() {
    return (
      <div id="contentroot" className={`overflow-auto h-screen flex flex-col h-screen ${localData.getTheme().gradient} ${localData.getTheme().textColor}`}>
        {/* MAIN PAGE*/}
        {/* Header */}
        <header className={`${localData.getTheme().mainColorTrans} backdrop-blur-md text-primary-foreground p-4 flex justify-between items-center sticky top-0 z-10`}>

          <header className={`text-xl font-bold ${localData.getTheme().textColor}`}>
            {localData.getTittle()}
          </header>
          <Avatar className={`w-8 h-8`}>
            <AvatarImage src={`${localData.getUser().getAvatar()}`} alt="User" />
            <AvatarFallback>{localData.getUser().getName()}</AvatarFallback>
          </Avatar>
        </header>

        {/* Main content */}
        <ScrollArea className={`flex-1 ${localData.getTheme().gradient}`}>
          {/* Kron input */}
          <div className={`p-4 border-b ${localData.getTheme().borderWither} ${localData.getTheme().mainColorTransless} backdrop-blur-md`}>
            <Textarea
              className={`KronicleInput w-full mb-2 ${localData.getTheme().bgWither} ${localData.getTheme().borderWither} ${localData.getTheme().textColor} ${localData.getTheme().placeholderTranslucent}`}
              placeholder="What's happening in your Kronicle?"
              value={kronContent}
              onChange={(e) => {
                setKronContent(e.target.value)
              }}
            />
            {localData.newKronImagePreview && renderImagePreview(localData.newKronImagePreview)}
            <div className={`flex justify-between items-center mt-2`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={`hidden`}
                id="image-upload"
              />
              <label htmlFor="image-upload" className={`cursor-pointer`}>
                <ImageIcon className={`h-6 w-6 text-primary-foreground`} />
              </label>
              <Button className={`bg-primary text-primary-foreground`} onClick={(e)=>{
                //get html objet with classname KronicleInput to efficiency
                handlePostKron()
                
                localData.setActiveView("home")
                update(localData,serverData)
              }}>
                Post Kron
              </Button>
            </div>
          </div>

          {/* Kron Feed */}
          <div className={`p-4`}>{renderContent()}</div>
        </ScrollArea>
        {/* SHEET*/}
      {renderMobileSheet(localData,serverData,update)}
      
        
      </div>
    )
  }

  return renderPage();
}