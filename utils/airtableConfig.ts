import dayjs from 'dayjs'
import Airtable from "airtable";

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app7WLkz7yBsSgLlu')

export type CsType = '문의' | '건의' | '신고'
export type ReportType = '유저' | '게시글' | '댓글' | 'NotReport'
export const postCSContent = (csType: CsType, userId: number, name: string = 'name', content: string, reportTargetType: ReportType = 'NotReport', reportTargetId: number = 0) => base('customer-service').create([
    {
        "fields": {
            "csType": csType,
            "userId": parseInt(userId.toString()),
            "name": name,
            "content": content,
            "createdAt": dayjs().format('YY-MM-DD HH:mm:ss'),
            "reportTargetId": parseInt(reportTargetId.toString()),
            "reportTargetType": reportTargetType
        }
    }
])

// @ts-ignore
export const sendVerificationRequest = (userId: number, name: string, userType: UserType, cardinalNum: number | null, imgUrl: string) => base('certification').create([
    {
        "fields": {
            "userId": userId,
            "name": name,
            "userType": userType,
            "cardinalNum": cardinalNum ?? 0,
            "photo": [
                {
                    "url": imgUrl
                }
            ]
        }
    }
])