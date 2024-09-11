

import {
    BellIcon,
    BookmarkIcon,
    CheckIcon,
    FlameIcon,
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
} from "lucide-react"
import * as React from "react"
import {
    SearchIcon
} from "../src/components/icons"
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../src/components/ui/select"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../src/components/ui/tabs"
import { Textarea } from "../src/components/ui/textarea"

import { statusColors } from "./objects/colors"

import { formatTimestamp } from "./lib/utils"
import * as Example from "./objects/exampledata"
import { IKron as KronPost, IUser as KronUser, LocalData } from "./server/api/dataModels/interface"
import * as LocalKron from "./server/api/dataModels/json-impl"

import * as KronUtils from "./lib/KronUtils"
import { kronConfig } from "./lib/KronUtils"

export default function Component() {
  const [localDataT,updateLocal] = React.useState(new LocalData(Example.exampleUser,[]));
  let localData = localDataT;
  const [serverDataT,updateServer] = React.useState(Example.serverDataState);
  let serverData = serverDataT;

  let KronicleLogo = localData.getTheme().logo

  const [render, forceRender] = React.useState(1);

  function update(local,server){
    updateLocal(local)
    updateServer(server)
    localData = local;
    serverData = server;
    KronicleLogo = localData.getTheme().logo
    console.log(local)
    console.log(server)
    forceRender(render+1)
  }





  const StatusIndicator = ({ status, isInteractable = true }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const selectRef = React.useRef(null);
  
    const toggleVisibility = () => {
      if (isInteractable) {
        setIsVisible(!isVisible);
      }
    };
  
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
  
    React.useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const indicator = (
      <div
        className={`w-4 h-4 rounded-full ${statusColors[status]} absolute bottom-0 right-0 border-2 ${localData.getTheme().borderMainColor} transform translate-x-1/3 translate-y-1/3 z-10`}
        onClick={toggleVisibility}
      />
    );
  
    return (
      <div className="relative">
        {indicator}
        {isVisible && isInteractable && (
          <div
            ref={selectRef}
            className="fixed bottom-0 left-0 right-0 w-full bg-transparent p-4 z-50"
            style={{
              boxShadow: "0px -2px 10px rgba(0, 0, 0, 0)",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            <Select
              value={status}
              onValueChange={(e) => {
                handleStatusChange(e);
                update(localData, serverData);
                setIsVisible(false); // Hide after selection
              }}
            >
              <SelectTrigger
                className={`w-full ${localData.getTheme().mainColor} rounded-md border-transparent ${localData.getTheme().fullTextColorStyleTwo} p-3 text-center`}
              >
                <SelectValue content="Set status" />
              </SelectTrigger>
  
              <SelectContent
                className={`${localData.getTheme().mainColor} rounded-md border-transparent ${localData.getTheme().fullTextColorStyleTwo}`}
              >
                <SelectItem value={`online`}>Online</SelectItem>
                <SelectItem value={`afk`}>AFK</SelectItem>
                <SelectItem value={`dnd`}>Do Not Disturb</SelectItem>
                <SelectItem value={`offline`}>Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    );
  };
  const MbtiOverlay = ({user }) => (
    <div
      className={`absolute inset-0 rounded-full border-2 z-0`}
      style={{ borderColor: user.getMbti().color}}
    />
  );

  const handleStatusChange = async (newStatus) => {
    if (newStatus === localData.getUser().getStatus()) {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        localData.setUserIp(data.ip);
      } catch (error: unknown) {
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
      <div className={`mt-2 relative`}>
        <button
          className={`text-white p-1`}
          onClick={() => {localData.setNewKronImagePreview("")
            update(localData,serverData)
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
            </Avatar><StatusIndicator status={user.getStatus()} isInteractable={user.getId() === localData.getUser().getId()} /><MbtiOverlay user={user} /></div>)}
          
          
            {config.showTag && (<div><span className={`font-bold  ${localData.getTheme().fullTextColor}`}>{user.getName()}</span> {config.showTime && (<span className={`text-sm  ${localData.getTheme().textColor}`}>{formatTimestamp(kron.getTimestamp())}</span>)}<p className={`text-sm  ${localData.getTheme().textColor}`}>{user.getTag()}</p></div>)}
          
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
        <CardContent>
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
                  } ${localData.getTheme().buttons[( actionIndex) % localData.getTheme().buttons.length]
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

  const renderUser = (user: KronUser, config?: kronConfig) => {
    return (<div key={user.getId()} className={`mb-4 flex items-center`}>
    <Button
      variant="ghost"
      className={``}
      onClick={() => {localData.setActiveView("profile")
        localData.setSelectedUser(user)
        update(localData,serverData)
      }}
    >
      <Avatar className={`w-12 h-12 mr-4`}>
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
        <p className={`font-bold ${localData.getTheme().fullTextColor}`}>{user.getName()}</p>
        <p className={` ${localData.getTheme().textColor}`}>{user.getTag()}</p>
      </div>
    </div>)
  }
  const renderExploreContent = () => {
    return (
      <div className={`space-y-6`}>
        <div className={`flex items-center space-x-4`}>
          <SearchIcon className={` ${localData.getTheme().fullTextColor}`} />
          <Input
            type="text"
            placeholder="Search..."
            className={`flex-grow  ${localData.getTheme().kronShadow}  ${localData.getTheme().borderWither}  ${localData.getTheme().fullTextColor}  ${localData.getTheme().placeholderTranslucent}`}
            onChange={(e)=>{
              localData.setSearchTerm(e.target.value)
              update(localData,serverData)
            }}
            content={localData.searchTerm}
          />
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-2`}>Suggested Tags</h3>
          <div className={`flex flex-wrap gap-2`}>
            {serverData.getSuggestedTags().map((tag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={` ${localData.getTheme().kronShadow} ${localData.getTheme().kronShadow}  ${localData.getTheme().fullTextColor}`}
                onClick={() => {
                  localData.setSearchTerm(localData.searchTerm+" "+tag)
                  update(localData,serverData)
                }}
              >
                <HashIcon className={`w-4 h-4 mr-1`} />
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <Tabs onValueChange={(e)=>{
          localData.setActiveSearchTab(e);
          update(localData,serverData)
        }} value={localData.activeSearchTab} >
          <TabsList className={`${localData.getTheme().mainColorTransless}`}>
            <TabsTrigger value="posts" className={` ${localData.getTheme().fullTextColor}`}>Posts</TabsTrigger>
            <TabsTrigger value="users" className={` ${localData.getTheme().fullTextColor}`}>Users</TabsTrigger>
            <TabsTrigger value="groups" className={` ${localData.getTheme().fullTextColor}`}>Groups</TabsTrigger>
          </TabsList>
          <TabsContent value={`posts`}>
            {serverData.filterPosts(localData.searchTerm).filter(kron =>{
          return !kron.isCommentKron() && !kron.isGroupKron()
        }).map((kron, index) => renderKron(kron, index))}
          </TabsContent>
          <TabsContent value={`users`}>
            {serverData.filterUsers(localData.searchTerm).map((user, index) => (
              <Card key={index} className={`mb-4  ${localData.getTheme().kronShadow} backdrop-blur-md  ${localData.getTheme().borderWither}`}>
                <CardHeader className={`flex flex-row items-center`}>
                  <Avatar className={`w-10 h-10 mr-2`}>
                    <AvatarImage src={user.getAvatar()} alt={user.getName()} />
                    <AvatarFallback>{user.getName().split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className={`font-semibold ${localData.getTheme().fullTextColor}`}>{user.getName()}</h3>
                    <p className={`text-sm  ${localData.getTheme().textColor}`}>{user.getTag()}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value={`groups`}>
            {serverData.filterGroups(localData.searchTerm).map((group, index) => (
              <Card key={index} className={`mb-4  ${localData.getTheme().kronShadow} backdrop-blur-md  ${localData.getTheme().borderWither}`}>
                <CardHeader>
                  <h3 className={`font-semibold ${localData.getTheme().fullTextColor}`}>{group.getName()}</h3>
                  <p className={`text-sm  ${localData.getTheme().textColor}`}>{group.getMembers().length} members</p>
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
              <div className={`mb-4 flex items-center`}>
                <Avatar className={`w-16 h-16 mr-4`}>
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
                  <h2 className={`text-2xl font-bold`}>{selUser.getName()}</h2>
                  <p className={` ${localData.getTheme().textColor}`}>{selUser.getTag()}</p>
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
            <h2 className={`text-2xl font-bold mb-4`}>Following</h2>
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
    <div className={`flex h-screen ${localData.getTheme().gradient} ${localData.getTheme().fullTextColor}`}>
      {/* Sidebar */}
      <div className={`w-64 border-r ${localData.getTheme().borderWither} p-4 ${localData.getTheme().mainColorTrans} backdrop-blur-md flex flex-col`}>
        <div className={`flex items-center mb-8`}>
          {KronicleLogo}
          <span className={`text-xl font-bold  ${localData.getTheme().fullTextColor} ml-2`}>
            Kronicle
          </span>
        </div>
        <nav className={`flex-grow`}>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${localData.getTheme().buttons[0].bg} ${localData.getTheme().buttons[0].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {
              localData.setActiveView("home")
              localData.setSelectedGroup(null)
              update(localData,serverData)}}
          >
            <HomeIcon className={`mr-2 h-4 w-4`} />
            Home
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${localData.getTheme().buttons[1].bg} ${localData.getTheme().buttons[1].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("explore")
              update(localData,serverData)
            }}
          >
            <SearchIcon className={`mr-2 h-4 w-4`} />
            Explore
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${localData.getTheme().buttons[2].bg} ${localData.getTheme().buttons[2].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("notifications")
              update(localData,serverData)
            }}
          >
            <BellIcon className={`mr-2 h-4 w-4`} />
            Notifications
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${localData.getTheme().buttons[3].bg} ${localData.getTheme().buttons[3].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("messages")
              update(localData,serverData)
            }}
          >
            <MessageCircleIcon className={`mr-2 h-4 w-4`} />
            Messages
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${localData.getTheme().buttons[4].bg} ${localData.getTheme().buttons[4].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("bookmarks")
              update(localData,serverData)
            }}
          >
            <BookmarkIcon className={`mr-2 h-4 w-4`} />
            Bookmarks
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${localData.getTheme().buttons[5].bg} ${localData.getTheme().buttons[5].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("profile")
              localData.setSelectedUser(localData.getUser())
              update(localData,serverData)
            }}
          >
            <UserIcon className={`mr-2 h-4 w-4`} />
            Profile
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${localData.getTheme().buttons[6].bg} ${localData.getTheme().buttons[6].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => {localData.setActiveView("following")
              update(localData,serverData)
            }}
          >
            <UsersIcon className={`mr-2 h-4 w-4`} />
            Following
          </Button>
          <div className={`mt-4 mb-2  ${localData.getTheme().textColor} font-semibold`}>Groups</div>
          {serverData.getAllGroups().filter(group => group.kronGroup.getMembers().includes(localData.getUser().getId())).map((group, index) => (
            <Button
              key={group.id}
              variant="ghost"
              className={`w-full justify-start mb-2 ${localData.getTheme().fullTextColor} ${localData.getTheme().buttons[index % localData.getTheme().buttons.length].bg} ${localData.getTheme().buttons[index % localData.getTheme().buttons.length].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
              onClick={() => {
                localData.setSelectedGroup(group.kronGroup)
                localData.setActiveView("group")
                update(localData,serverData)
              }}
            >
              <FolderIcon className={`mr-2 h-4 w-4`} />
              {group.kronGroup.getName()}
            </Button>
          ))}
        </nav>
        <div className={`mt-auto pt-4 border-t  ${localData.getTheme().borderWither}`}>
          <div className={`flex items-center mb-2`}>
            <div className={`relative mr-2`}>
              <Avatar className={`w-10 h-10`}>
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
              <MbtiOverlay user={localData.getUser()} />
            </div>
            <div>
              <p className={`font-semibold  ${localData.getTheme().fullTextColor}`}>
                {localData.getUser().getName()}
              </p>
              <p className={`text-xs  ${localData.getTheme().textColor}`}>
                {localData.getUser().getTag()}
              </p>
            </div>
          </div>
          {localData.userIp && (
            <p className={`mt-2 text-xs  ${localData.getTheme().textColor}`}>Your IP: {localData.userIp}</p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 overflow-auto`}>
        {/* Header */}
        <header className={`${localData.getTheme().mainColorTrans} backdrop-blur-md  ${localData.getTheme().fullTextColor} p-4 sticky top-0 z-10`}>
          <h1 className={`text-xl font-bold`}>{"Kronicle "+localData.getTittle()}</h1>
        </header>

        {/* Kron input */}
        <div className={`p-4 border-b ${localData.getTheme().borderWither} backdrop-blur-md`}>
          <Textarea
            className={`w-full mb-2 ${localData.getTheme().kronShadow}  ${localData.getTheme().borderWither} ${localData.getTheme().fullTextColor}  ${localData.getTheme().placeholderTranslucent}`}
            placeholder="What's happening in your Kronicle?"
            onChange={(e) => {localData.setNewKronContent(e.target.value)
              update(localData,serverData)
            }}
            value={localData.newKronContent}
          />
          {localData.newKronImagePreview && renderImagePreview(localData.newKronImagePreview)}
          <div className={`flex justify-between items-center mt-2`}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageUpload(e)
              }}
              className={`hidden`}
              id="image-upload"
            />
            <label htmlFor={`image-upload`} className={`cursor-pointer`}>
              <ImageIcon className={`h-6 w-6  ${localData.getTheme().fullTextColor}`} />
            </label>
            <Button
              className={` ${localData.getTheme().fullTextColor} transition-all duration-300 shadow-md hover:shadow-lg ${localData.getTheme().buttons[2].bg} ${localData.getTheme().buttons[2].hover}`}
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
        <div className={`p-4`}>{renderContent()}</div>
      </div>
    </div>
  );
}
