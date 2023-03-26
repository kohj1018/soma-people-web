export function afterLoadingIsComplete(userId: number | null) {
  // @ts-ignore
  AfterLoadingIsComplete.postMessage(JSON.stringify({
    userId: userId ?? 0
  }))
}