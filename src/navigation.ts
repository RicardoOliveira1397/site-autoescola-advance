import { useEffect, useState } from 'react';
export function usePathname() {
    const [pathname, setPathname] = useState(window.location.pathname);
    useEffect(() => {
        const update = () => setPathname(window.location.pathname);
        const onClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
                return;
            const link = (event.target as Element)?.closest('a');
            if (!link || link.target || link.hasAttribute('download'))
                return;
            const url = new URL(link.href, location.href);
            if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol))
                return;
            if (url.pathname === location.pathname)
                return;
            event.preventDefault();
            history.pushState(null, '', url.pathname + url.search + url.hash);
            update();
        };
        document.addEventListener('click', onClick);
        window.addEventListener('popstate', update);
        return () => { document.removeEventListener('click', onClick); window.removeEventListener('popstate', update); };
    }, []);
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const anchor = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
            if (anchor)
                anchor.scrollIntoView();
            else
                window.scrollTo({ top: 0, behavior: 'instant' });
        });
        return () => cancelAnimationFrame(frame);
    }, [pathname]);
    return pathname;
}
