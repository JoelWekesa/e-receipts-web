export const urlStrip = (url: string) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];

    return filename;
}