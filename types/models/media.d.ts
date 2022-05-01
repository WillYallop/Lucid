// Key: mod_

type mod_validMimes = 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/avif' | 'image/webp' | 'image/svg+xml' | 'image/gif' | 'application/pdf';

interface mod_mediaModel {
    _id: string
    location: 'local' | 's3'
    key: string
    alt?: string
    width?: number
    height?: number
    types: {
        data: Array<'jpeg' | 'jpg' | 'png' | 'webp' | 'avif' | 'svg' | 'gif' | 'pdf'>
    }
    uploaded: string
    modified: string
    title: string
}