export function afterLoadingIsComplete(userId: number, userAgent: string) {
  // @ts-ignore
  if (window.AfterLoadingIsComplete) {
    // @ts-ignore
    AfterLoadingIsComplete.postMessage(JSON.stringify({
      userId: userId ?? 0,
      userAgent: userAgent,
    }))
  }
}