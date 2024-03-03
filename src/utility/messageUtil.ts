import sanitizeHtml from 'sanitize-html';
import emoji from "emoji-js";


// -----------------------------------------------------

export function unintendedMsgValidation (day:number) {
  let isValid = true;
  if(day===0 || day===6){isValid = false}
  return isValid
};

export async function convertHtmlToWhatsApp(html:string) {
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: ['b', 'strong', 'i', 'em', 'u', 's', 'strike', 'br', 'p'],
    allowedAttributes: {},
  });

  const paragraphRegex = /<p\b[^>]*>(.*?)<\/p>/gis;
  const paragraphReplace = '$1\n';
  const message = cleanHtml.replace(paragraphRegex, paragraphReplace);

  const brRegex = /<br\s*\/?>/gi;
  const brReplace = '\n';
  const brMessage = message.replace(brRegex, brReplace);

  const emojiConverter = new emoji();
  const emojiRegex = /<img.*?data-emoji="([^\s"]+)".*?>/gi;
  const emojiReplace = (match:any, p1:any) => {
    const emojiUnicode = emojiConverter.replace_colons(`:${p1}:`);
    return emojiUnicode ? escapeHTML(emojiUnicode) : '';
  };
  const emojiMessage = brMessage.replace(emojiRegex, emojiReplace);

  const boldRegex = /<b\b[^>]*>(.*?)<\/b>/gi;
  const boldReplace = '*$1*';
  const boldMessage = emojiMessage.replace(boldRegex, boldReplace);

  const italicRegex = /<i\b[^>]*>(.*?)<\/i>/gi;
  const italicReplace = '_$1_';
  const italicMessage = boldMessage.replace(italicRegex, italicReplace);

  const strikeRegex = /<strike\b[^>]*>(.*?)<\/strike>/gi;
  const strikeReplace = '~$1~';
  const strikeMessage = italicMessage.replace(strikeRegex, strikeReplace);

  return strikeMessage;
}

export function escapeHTML(text:any) {
  const replacements = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;'
  };
  return text.replace(/[<>&"'\/]/g, (match: keyof typeof replacements) => replacements[match]);
};

export function replaceVariable(text:string, stringToReplace:string, varThatReplace:any){
  const textToReturn = text.replace(stringToReplace, varThatReplace);
  return textToReturn
};
