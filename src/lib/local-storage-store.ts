import { writable } from 'svelte/store';

const storageKey = 'siteList';

interface SiteInfo {
  name: string;
  url: string;
  key: string;
};

function createSites() {
  let rawList: SiteInfo[] = [];

  const isBrowser = typeof(localStorage) != 'undefined' && typeof(window) != 'undefined';
  if (isBrowser) {
    const val = localStorage.getItem(storageKey);
    if (val) {
      rawList = JSON.parse(val);
    }
  }

  const { subscribe, set } = writable(rawList);
  const localUpdate = () => {
    set(rawList);
    if (isBrowser) {
      localStorage.setItem(storageKey, JSON.stringify(rawList));
    }
  }

  const clear = () => {
    rawList = [];
    localUpdate();
  }
  const add = (info: SiteInfo) => {
    rawList.push(info);
    localUpdate();
  }
  const remove = (idx: number) => {
    if (idx < rawList.length) {
      rawList.splice(idx, 1);
      localUpdate();
    }
  }
  const setInfo = (idx: number, info: SiteInfo) => {
    if (idx < rawList.length) {
      rawList[idx] = info;
      localUpdate();
    }
  }

  return {
    subscribe,
    clear,
    add,
    remove,
    setInfo,
  };
}

export const sites = createSites();

export const makeApiUrl = (site: SiteInfo, param: string): string => {
  return `/api?tgt=${encodeURIComponent(site.url)}&prm=${encodeURIComponent(param)}&key=${site.key}`;
} 
