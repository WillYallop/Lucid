// Key: mod_

type mod_validMimes = 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/avif' | 'image/webp' | 'image/svg+xml' | 'image/gif' | 'application/pdf';
type mod_validExt = 'jpeg' | 'jpg' | 'png' | 'webp' | 'avif' | 'svg' | 'gif' | 'pdf';

interface mod_mediaModel {
    _id: string
    location: 'local' | 'aws'
    key: string
    alt?: string
    width?: number
    height?: number
    types: {
        data: Array<mod_validExt>
    }
    uploaded: string
    modified: string
    title: string
}