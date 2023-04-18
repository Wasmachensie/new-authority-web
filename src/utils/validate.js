export function isExternal(path) {
    return /^(http:|tel:|mailto:)/.test(path)
}