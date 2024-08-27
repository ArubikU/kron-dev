import {
  BookmarkIcon,
  CheckIcon,
  FolderIcon,
  HeartIcon,
  HomeIcon,
  ImageIcon,
  LinkIcon,
  MessageCircleIcon,
  UserPlusIcon,
  UsersIcon,
  XIcon
} from "lucide-react";
import * as React from "react";
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
import { Textarea } from "../src/components/ui/textarea";

import { LocalData, ServerData, ServerDataBuilder } from "../src/objects/server";
import { LocalUser } from "../src/objects/user";



const localData = new LocalData(
   new LocalUser({
    id: "user1",
    name: "John Doe",
    tag: "@johndoe",
    avatar: "/placeholder-avatar.jpg",
    status: "online",
    mbti: "INTJ",
    mail: "sk_12345abcde",
    password: "si_67890fghij",
    followers: ["user2", "user3"],
    following: ["user2"]}
  ),[]);

const serverData = new ServerDataBuilder();

export default function Component() {
  const [userStatus, setUserStatus] = React.useState(
    LocalData.currentUser.status
  );
  const [userIp, setUserIp] = React.useState("");
  const [newKronContent, setNewKronContent] = React.useState("");
  const [newKronImage, setNewKronImage] = React.useState(null);
  const [newKronImagePreview, setNewKronImagePreview] = React.useState("");
  const [activeComments, setActiveComments] = React.useState(null);
  const [newComment, setNewComment] = React.useState("");
  const [activeView, setActiveView] = React.useState("home");
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [copiedKronId, setCopiedKronId] = React.useState(null);

  const buttonColors = [
    { bg: "bg-[#960018]", hover: "hover:bg-[#960018]/80" },
    { bg: "bg-[#E34234]", hover: "hover:bg-[#E34234]/80" },
    { bg: "bg-[#FF7F50]", hover: "hover:bg-[#FF7F50]/80" },
    { bg: "bg-[#FFA07A]", hover: "hover:bg-[#FFA07A]/80" },
    { bg: "bg-[#FFA500]", hover: "hover:bg-[#FFA500]/80" },
    { bg: "bg-[#FCAE1E]", hover: "hover:bg-[#FCAE1E]/80" },
    { bg: "bg-[#FFBF00]", hover: "hover:bg-[#FFBF00]/80" },
  ];

  const mbtiColors = {
    INTJ: "#1E90FF",
    INTP: "#32CD32",
    ENTJ: "#FF69B4",
    ENTP: "#FFA500",
    ISFJ: "#8A2BE2",
  };

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
        <PopoverTrigger asChild>
          {indicator}
        </PopoverTrigger>
        <PopoverContent>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Set status" />
            </SelectTrigger>
            <SelectContent>
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
    setUserStatus(newStatus);
    if (newStatus === LocalData.currentUser.status) {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
        setUserIp("Unable to fetch IP");
      }
    } else {
      setUserIp("");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewKronImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewKronImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostKron = () => {
    if (newKronContent.trim() || newKronImage) {
      const newKron = {
        id: `kron${ServerData.allKrons.length + 1}`,
        userId: LocalData.currentUser.id,
        content: newKronContent,
        timestamp: new Date().toISOString(),
        likes: 0,
        rekrons: 0,
        comments: [],
        tags: newKronContent.match(/#\w+/g) || [],
        image: newKronImage ? URL.createObjectURL(newKronImage) : null,
      };
      ServerData.allKrons.unshift(newKron);
      ServerData.recentKrons.unshift(newKron.id);
      ServerData.kronsByUser[LocalData.currentUser.id].recentKrons.unshift(
        newKron.id
      );
      ServerData.kronsByUser[LocalData.currentUser.id].allKrons.unshift(
        newKron.id
      );
      setNewKronContent("");
      setNewKronImage(null);
      setNewKronImagePreview("");
      // In a real application, you would send this data to the server here
    }
  };

  const handleToggleComments = (kronId) => {
    setActiveComments(activeComments === kronId ? null : kronId);
  };

  const handlePostComment = (kronId) => {
    if (newComment.trim()) {
      const kron = ServerData.allKrons.find((k) => k.id === kronId);
      if (kron) {
        const newCommentObj = {
          id: `comment${kron.comments.length + 1}`,
          userId: LocalData.currentUser.id,
          content: newComment,
          timestamp: new Date().toISOString(),
        };
        kron.comments.push(newCommentObj);
        setNewComment("");
        // In a real application, you would send this data to the server here
      }
    }
  };

  const handleCopyKronUrl = (kronId) => {
    const url = `${window.location.origin}/kron/${kronId}`;
    navigator.clipboard.writeText(url);
    setCopiedKronId(kronId);
    setTimeout(() => setCopiedKronId(null), 2000);
  };

  const renderImagePreview = (url) => {
    return (
      <div className="mt-2 relative">
        <img src={url} alt="Preview" className="max-w-full h-auto rounded-lg" />
        <button
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
          onClick={() => setNewKronImagePreview("")}
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const renderUrlPreview = (url) => {
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

  const renderKron = (kron, index) => {
    const user =
      ServerData.users.find((u) => u.id === kron.userId) ||
      LocalData.currentUser;
    return (
      <Card
        key={kron.id}
        className="mb-4 bg-[#FFF6E9]/10 backdrop-blur-md border-[#FFF6E9]/20 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-2">
              <Avatar className="w-10 h-10 border-2 border-[#FCAE1E]">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <StatusIndicator status={user.status} isInteractable={user.id === LocalData.currentUser.id} />
              <MbtiOverlay mbti={user.mbti} />
            </div>
            <div>
              <p className="font-bold text-[#FFF6E9]">{user.name}</p>
              <p className="text-sm text-[#FFF6E9]/60">{user.handle}</p>
            </div>
          </div>
          {user.id !== LocalData.currentUser.id && (
            <Button
              variant="outline"
              size="sm"
              className="text-[#FFF6E9] border-[#FFF6E9] hover:bg-[#FFF6E9]/10"
            >
              <UserPlusIcon className="h-4 w-4 mr-1" />
              {LocalData.currentUser.following.includes(user.id) ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-[#FFF6E9]">{kron.content}</p>
          {kron.image && (
            <img
              src={kron.image}
              alt="Kron image"
              className="mt-2 rounded-lg"
            />
          )}
          {!kron.image &&
            kron.content.match(/https?:\/\/[^\s]+/) &&
            renderUrlPreview(kron.content.match(/https?:\/\/[^\s]+/)[0])}
          {kron.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {kron.tags.map((tag, index) => (
                <span key={index} className="text-blue-400 text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex gap-4">
            {[
              {
                name: "Comment",
                icon: MessageCircleIcon,
                count: kron.comments.length,
              },
              { name: "ReKron", icon: BookmarkIcon, count: kron.rekrons },
              { name: "Like", icon: HeartIcon, count: kron.likes },
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
                onClick={() =>
                  action.name === "Comment" && handleToggleComments(kron.id)
                }
              >
                <action.icon className="h-5 w-5 mr-1" />
                <span>{action.count}</span>
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#FFF6E9]"
            onClick={() => handleCopyKronUrl(kron.id)}
          >
            {copiedKronId === kron.id ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <LinkIcon className="h-5 w-5" />
            )}
          </Button>
        </CardFooter>
        {activeComments === kron.id && (
          <div className="px-4 pb-4">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2 bg-[#FFF6E9]/10 border-[#FFF6E9]/20 text-[#FFF6E9] placeholder-[#FFF6E9]/60"
            />
            <Button onClick={() => handlePostComment(kron.id)} className="mb-4">
              Post Comment
            </Button>
            {kron.comments.map((comment, index) => {
              const commentUser =
                ServerData.users.find((u) => u.id === comment.userId) ||
                LocalData.currentUser;
              return (
                <div key={comment.id} className="mb-2 last:mb-0">
                  <div className="flex items-center mb-1">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage
                        src={commentUser.avatar}
                        alt={commentUser.name}
                      />
                      <AvatarFallback>
                        {commentUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm">
                      {commentUser.name}
                    </span>
                  </div>
                  <p className="text-sm ml-8">{comment.content}</p>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return ServerData.allKrons.map((kron, index) =>
          renderKron(kron, index)
        );
      case "group":
        if (selectedGroup) {
          const groupKrons = ServerData.allKrons.filter((kron) =>
            selectedGroup.krons.includes(kron.id)
          );
          return groupKrons.map((kron, index) => renderKron(kron, index));
        }
        return <p>Select a group to view krons</p>;
      case "profile":
        if (selectedUser) {
          const userKrons = ServerData.allKrons.filter(
            (kron) => kron.userId === selectedUser.id
          );
          return (
            <div>
              <div className="mb-4 flex items-center">
                <Avatar className="w-16 h-16 mr-4">
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                  <p className="text-[#FFF6E9]/60">{selectedUser.handle}</p>
                </div>
              </div>
              {userKrons.map((kron, index) => renderKron(kron, index))}
            </div>
          );
        }
        return <p>Select a user to view their profile</p>;
      case "following":
        const followingUsers = ServerData.users.filter((user) =>
          LocalData.currentUser.following.includes(user.id)
        );
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Following</h2>
            {followingUsers.map((user) => (
              <div key={user.id} className="mb-4 flex items-center">
                <Avatar className="w-12 h-12 mr-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-[#FFF6E9]/60">{user.handle}</p>
                </div>
              </div>
            ))}
          </div>
        );
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
            onClick={() => setActiveView("home")}
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[1].bg} ${buttonColors[1].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => setActiveView("explore")}
          >
            <SearchIcon className="mr-2 h-4 w-4" />
            Explore
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[2].bg} ${buttonColors[2].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => setActiveView("notifications")}
          >
            <BellIcon className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[3].bg} ${buttonColors[3].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => setActiveView("messages")}
          >
            <MessageCircleIcon className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[4].bg} ${buttonColors[4].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => setActiveView("bookmarks")}
          >
            <BookmarkIcon className="mr-2 h-4 w-4" />
            Bookmarks
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[5].bg} ${buttonColors[5].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => setActiveView("profile")}
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-black ${buttonColors[6].bg} ${buttonColors[6].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
            onClick={() => setActiveView("following")}
          >
            <UsersIcon className="mr-2 h-4 w-4" />
            Following
          </Button>
          <div className="mt-4 mb-2 text-[#FFF6E9]/60 font-semibold">Groups</div>
          {ServerData.groups.map((group, index) => (
            <Button
              key={group.id}
              variant="ghost"
              className={`w-full justify-start mb-2 text-black ${buttonColors[index % buttonColors.length].bg} ${buttonColors[index % buttonColors.length].hover} transition-colors duration-200 bg-opacity-70 hover:bg-opacity-90`}
              onClick={() => {
                setSelectedGroup(group)
                setActiveView("group")
              }}
            >
              <FolderIcon className="mr-2 h-4 w-4" />
              {group.name}
            </Button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-[#FFF6E9]/20">
          <div className="flex items-center mb-2">
            <div className="relative mr-2">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={LocalData.currentUser.avatar}
                  alt={LocalData.currentUser.name}
                />
                <AvatarFallback>
                  {LocalData.currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <StatusIndicator status={userStatus} />
              <MbtiOverlay mbti={LocalData.currentUser.mbti} />
            </div>
            <div>
              <p className="font-semibold text-[#FFF6E9]">
                {LocalData.currentUser.name}
              </p>
              <p className="text-xs text-[#FFF6E9]/60">
                {LocalData.currentUser.handle}
              </p>
            </div>
          </div>
          {userIp && (
            <p className="mt-2 text-xs text-[#FFF6E9]/60">Your IP: {userIp}</p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-[#960018]/80 backdrop-blur-md text-[#FFF6E9] p-4 sticky top-0 z-10">
          <h1 className="text-xl font-bold">Kronicle Feed</h1>
        </header>

        {/* Kron input */}
        <div className="p-4 border-b border-[#FFF6E9]/20 bg-[#960018]/60 backdrop-blur-md">
          <Textarea
            className="w-full mb-2 bg-[#FFF6E9]/10 border-[#FFF6E9]/20 text-[#FFF6E9] placeholder-[#FFF6E9]/60"
            placeholder="What's happening in your Kronicle?"
            value={newKronContent}
            onChange={(e) => setNewKronContent(e.target.value)}
          />
          {newKronImagePreview && renderImagePreview(newKronImagePreview)}
          <div className="flex justify-between items-center mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <ImageIcon className="h-6 w-6 text-[#FFF6E9]" />
            </label>
            <Button
              className={`text-[#FFF6E9] transition-all duration-300 shadow-md hover:shadow-lg ${buttonColors[2].bg} ${buttonColors[2].hover}`}
              onClick={handlePostKron}
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
