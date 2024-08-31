/* eslint-disable no-cond-assign, no-plusplus, no-useless-escape, no-param-reassign */


import * as React from "react";

import ReactDOMServer from 'react-dom/server';

import { IServerData, LocalData } from "../objects/server/interface";




function getGroups(str: string, localData: LocalData, serverData: IServerData, updater: CallableFunction, regex: RegExp, index: number) {
  let m: RegExpExecArray | null;
  const results = [];

  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    if (m.length > 1) {
      if (m) {
        let a = m[index];
        if (a) {
          results.push(a);
        }
      }
    }
  }

  return results;
}

function findUsernames(str: string, localData: LocalData, serverData: IServerData, updater: CallableFunction) {
  const regex = /([^a-zA-Z0-9_]|^)(@([a-zA-Z0-9_]+))/gm;
  return getGroups(str,  localData,serverData,updater, regex, 3);
}

function findLinks(str: string, localData: LocalData, serverData: IServerData, updater: CallableFunction) {
  const regex = /((\s|^)((((http|ftp|https):\/\/)*)([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])))/gm;
  return getGroups(str,  localData,serverData,updater, regex, 3);
}

function findHashtags(str: string, localData: LocalData, serverData: IServerData, updater: CallableFunction) {
  const regex = /([\s\W]|^)#(\w+)/gm;
  return getGroups(str,  localData,serverData,updater, regex, 2);
}

function replaceLinks(str: string, localData: LocalData, serverData: IServerData, updater: CallableFunction) {
  let finalStr = str;
  const links = findLinks(str,  localData,serverData,updater);
  links.forEach((link) => {
    finalStr = finalStr.replace(
      link,
      `<a target="_blank" class="flex-wrap text-wrap text-blue-400 text-sm" href="${link}">${link}</a>`,
    );
  });
  return finalStr;
}

function replaceUsernames(str: string, localData: LocalData, serverData: IServerData, updater: CallableFunction) {
  let finalStr = str;
  const usernames = findUsernames(str,  localData,serverData,updater);
  usernames.forEach((username) => {
    finalStr = finalStr.replace(
      `@${username}`,
      `<a target="_blank" class="flex-wrap text-wrap" href="https://twitter.com/${username}">@${username}</a>`,
    );
  });
  return finalStr;
}
function replaceHashtags(str: string, localData: LocalData, serverData: IServerData, updater: CallableFunction) {
  let finalStr = str;
  const hashtags = findHashtags(str,  localData,serverData,updater);
  hashtags.forEach((hashtag) => {

    let element = (<button className={`flex-wrap text-wrap text-blue-400 text-sm`} onClick={(e) => {
      localData.setActiveView("explore")
      localData.setSearchTerm(hashtag)
      updater(localData, serverData)
    }}> #{hashtag} </button>)
    
    finalStr = finalStr.replace(
      `#${hashtag}`,
      ReactDOMServer.renderToString(element),
    );
  });
  return finalStr;
}

function replaceLinksUsernamesHashtags(text: string, localData: LocalData, serverData: IServerData, updater: CallableFunction): string {
  return replaceHashtags(replaceUsernames(replaceLinks(text,  localData,serverData,updater),  localData,serverData,updater),  localData,serverData,updater);
}

// Usage example:
function processElementContent(text: string, localData: LocalData, serverData: IServerData, updater: CallableFunction): string {
  return replaceLinksUsernamesHashtags(text, localData,serverData,updater);
}

export default processElementContent;
