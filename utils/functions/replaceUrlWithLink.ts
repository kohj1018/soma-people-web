export function replaceLinkInContentToUrl(content: string): string {
  const urlRegex = /(http|https):\/\/\S+/g;
  return content.replace(urlRegex, (url) => `<a href="${url}" className='text-emerald-500 underline' >${url}</a>`);
}