export type postType = {
    title?: string,
    author?: {
        profileImage: string,
        name: string
    },
    channel?:{
        image:string,
        name:string
    },
    content?:string,
    likeCount?: number,
    commentCount?: number,
    _id?:string
}