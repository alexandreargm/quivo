import { v4 } from "uuid";

export function uuid() {
    return v4()
}

export function namespacedUuid(namespace) {
    return `${namespace}-${v4()}`
}