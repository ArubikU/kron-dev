


import {
  BellIcon,
  BookmarkIcon,
  HomeIcon,
  MessageCircleIcon,
  UserIcon
} from "lucide-react"
import * as React from "react"
import { Button } from "../components/ui/button"


import { IServerData, IKron as KronPost, LocalData } from "../server/api/dataModels/interface"


import useLinksUsernamesHashtags from '../lib/useContentKron'

import { MenuIcon } from "lucide-react"
import { Sheet } from 'react-modal-sheet'
import { SearchIcon } from "../components/icons"
import KronImages from "../components/image/kronImage"
import { ThemeColors } from "../themes/Theme"

const normalWord = (word: string, theme: ThemeColors) => (<span className={`${theme.fullTextColor}`}> {word} </span>);
const tagWord = (word: string, localData: LocalData, serverData: IServerData, updater: CallableFunction) => (<button className={`text-blue-400 text-sm`} onClick={(e) => {
  localData.setActiveView("explore")
  localData.setSearchTerm(word)
  updater(localData, serverData)
}}> {word} </button>);

const hrlink = (word: string) => (<textarea className={`text-blue-400 text-sm`} onClick={(e) => {
  window.open(word,"_blank")
}}> {word} </textarea>);

const renderCarousel = (words: string[]) => {
  let images = words.filter(word => {
    if (word.includes("blob:")) {
      return true;
    }
    if (word.match(/https?:\/\/[^\s]+/) == null) {
      return false;
    }
    if (word.includes("youtube.com") || word.includes("youtu.be")) {
      return true;
    }
    if (word.match(/\.(jpeg|jpg|gif|png|webp|mp4)$/) == null &&
      word.match(/format=(jpeg|jpg|gif|png|webp|mp4)/) == null) {
      return false;
    };
    return word;
  })

  if (images.length == 0) {
    return (<span></span>);
  }
  return (KronImages(images))
}


export const renderMobileSheet = (localData: LocalData, serverData: IServerData, updater: CallableFunction) => {
  return (

    <div>
      <Button className={`wrapper-sheet ${localData.getTheme().buttons[0].bgshadow} transition-all border-transparent rounded-none`} variant={`ghost`} size="icon" onClick={() => {
        localData.setIsMenuOpen(!localData.isMenuOpen)
        updater(localData,serverData)
      }
      }>
        <MenuIcon className={`h-6 w-6 ` } color={`${localData.getTheme().menuColor}`}/>
      </Button>

      <Sheet rootId="contentroot" isOpen={localData.isMenuOpen} onClose={() => {
        localData.setIsMenuOpen(!localData.isMenuOpen)
        updater(localData, serverData)
      }} 
      detent="content-height"
        snapPoints={[600, 400, 210, 0]}
      initialSnap={0}>
        <Sheet.Container className={`transition-all ${localData.getTheme().mainColorTrans} backdrop-blur-md border-transparent`}>
          <Sheet.Header className={`${localData.getTheme().mainColorTrans}`} />
          <Sheet.Content className={`flex flex-col gap-2 transition-all ${localData.getTheme().mainColorTrans}`}>
            <Button
            style={{ height: 35 }}
              variant="ghost"
              className={`${localData.getTheme().buttons[0].bg} ${localData.getTheme().buttons[0].hover} transition-colors rounded-none duration-200 bg-opacity-70 hover:bg-opacity-90`}
              onClick={() => {
                localData.setActiveView("home")
                localData.setIsMenuOpen(false)

                updater(localData, serverData)
              }}
            >
              <HomeIcon className={`mr-2 h-4 w-4`} />
              Home
            </Button>
            <Button
            style={{ height: 35 }}
              variant="ghost"
              className={`${localData.getTheme().buttons[1].bg} ${localData.getTheme().buttons[1].hover} transition-colors rounded-none duration-200 bg-opacity-70 hover:bg-opacity-90`}
              onClick={() => {
                localData.setActiveView("explore")
                localData.setIsMenuOpen(false)

                updater(localData, serverData)
              }}
            >
              <SearchIcon className={`mr-2 h-4 w-4`} />
              Explore
            </Button>
            <Button
            style={{ height: 35 }}
              variant="ghost"
              className={`${localData.getTheme().buttons[2].bg} ${localData.getTheme().buttons[2].hover} transition-colors rounded-none duration-200 bg-opacity-70 hover:bg-opacity-90`}
              onClick={() => {
                localData.setActiveView("notifications")
                localData.setIsMenuOpen(false)

                updater(localData, serverData)
              }}
            >
              <BellIcon className={`mr-2 h-4 w-4`} />
              Notifications
            </Button>
            <Button
            style={{ height: 35 }}
              variant="ghost"
              className={`${localData.getTheme().buttons[3].bg} ${localData.getTheme().buttons[3].hover} transition-colors rounded-none duration-200 bg-opacity-70 hover:bg-opacity-90`}
              onClick={() => {
                localData.setActiveView("messages")
                localData.setIsMenuOpen(false)

                updater(localData, serverData)
              }}
            >
              <MessageCircleIcon className={`mr-2 h-4 w-4`} />
              Messages
            </Button>
            <Button
            style={{ height: 35 }}
              variant="ghost"
              className={`${localData.getTheme().buttons[4].bg} ${localData.getTheme().buttons[4].hover} transition-colors rounded-none duration-200 bg-opacity-70 hover:bg-opacity-90`}
              onClick={() => {
                localData.setActiveView("bookmarks")
                localData.setIsMenuOpen(false)

                updater(localData, serverData)
              }}
            >
              <BookmarkIcon className={`mr-2 h-4 w-4`} />
              Bookmarks
            </Button>
            <Button
            style={{ height: 35 }}
              variant="ghost"
              className={`${localData.getTheme().buttons[5].bg} ${localData.getTheme().buttons[5].hover} transition-colors rounded-none duration-200 bg-opacity-70 hover:bg-opacity-90`}
              onClick={() => {
                localData.setActiveView("profile")
                localData.setIsMenuOpen(false)

                updater(localData, serverData)
              }}
            >
              <UserIcon className={`mr-2 h-4 w-4`} />
              Profile
            </Button>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => {
        localData.setIsMenuOpen(!localData.isMenuOpen)
        updater(localData, serverData)
      }}/>
      </Sheet>
    </div>)
}

const renderUrlPreview = (url) => {
  if (url == null) return;
  // This is a simple implementation. In a real-world scenario, you'd want to fetch metadata for the URL
  return (
    <div className={`mt-2 border rounded p-2`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-blue-400 hover:underline`}
      >
        {url}
      </a>
    </div>
  );
};

export class kronConfig {
  showFollowing?: Boolean;
  showAvatar?: Boolean;
  showTag?: Boolean;
  showTime?: boolean;
}
export const showKronStat = (action) => {
  if (action.name === "Save") {
    return null;
  }
  return (action.count <= 0) ? null : action.count;
}

export const showKronStatClass = (action, theme: ThemeColors) => {
  if (action.name === "Save" && (action.count > 0)) {
    return `h-5 w-5 ${theme.fillTextColor}`;
  }
  return (action.count <= 0) ? "h-5 w-5 " : `h-5 w-5 mr-1 ${theme.fillTextColor}`;
}

export const renderKronContent = (kron: KronPost, localData: LocalData, serverData: IServerData, updater: CallableFunction) => {
  // Split the content into words
  let kronContent = kron.getContent().replace(/(?:\r\n|\r|\n)/g, '  ');
  let words = kronContent.split(' ');
  let wordsWithImage = [...words];
  let kronImage = kron.getImage();
  if (kronImage) {
    wordsWithImage.push(kronImage)
  }
  return (
    <div className="w-auto flex-wrap text-wrap">
      <p className={`flex-wrap text-wrap ${localData.getTheme().fullTextColor}`} dangerouslySetInnerHTML={{__html : useLinksUsernamesHashtags(kron.getContent().replace(/(?:\r\n|\r|\n)/g, '<p/>'),localData,serverData,updater)}}></p>
      <p></p>
      {renderCarousel(wordsWithImage)}
    </div>
  );
};