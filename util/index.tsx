type OriginalOpenFunction = (url?: string, target?: string, features?: string, replace?: boolean) => Window | null;
const originalOpen: OriginalOpenFunction = window.open;

const Patches = {
    TARGET_WINDOW_FLAG: 18,
    NEW_WINDOW_FLAG: 274,
}

window.open = function (url?: string, target?: string, features?: string, replace?: boolean): Window | null {

    if (!url) {
        return originalOpen(url, target, features, replace);
    }

    const parsedUrl = new URL(url);
    const queryParams = parsedUrl.searchParams;

    const windowFeature = "createflags";

    if (queryParams.has(windowFeature) && queryParams.get(windowFeature) === Patches.TARGET_WINDOW_FLAG.toString()) {
        queryParams.set(windowFeature, Patches.NEW_WINDOW_FLAG.toString());
        parsedUrl.search = queryParams.toString();
        url = parsedUrl.toString();
    }

    return originalOpen(url, target, features, replace);
};

export default async function PluginMain() {
    console.log('Bootstrapping DWMX');
}