declare const __BASE_PATH__: string;
export const basePath = __BASE_PATH__;
export function siteUrl(url: string | undefined): string | undefined {
 return url?.startsWith('/') && !url.startsWith('//') ? basePath + url : url;
}
export function appPathname() {
 const path = window.location.pathname;
 if (!basePath) return path;
 if (path === basePath) return '/';
 return path.startsWith(basePath + '/') ? path.slice(basePath.length) : path;
}
