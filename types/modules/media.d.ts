// Key: med_

interface UploadedFile {
    name: string;
    mv(path: string, callback: (err: any) => void): void;
    mv(path: string): Promise<void>;
    encoding: string;
    mimetype: string;
    data: Buffer;
    tempFilePath: string;
    truncated: boolean;
    size: number;
    md5: string;
}

interface med_uploadMediaRouteBody {
    object_key: string
    title: mod_mediaModel["title"]
    alt?: mod_mediaModel["alt"]
}

interface med_fileHandlerRes {
    process: boolean
    location: mod_mediaModel["location"]
    key: mod_mediaModel["key"]
    types: mod_mediaModel["types"]
    width?: mod_mediaModel["width"]
    height?: mod_mediaModel["height"]
}

interface med_storeInp {
    data: Buffer
    mime: mod_validMimes | string
}

interface med_saveMediaDoc {
    location: mod_mediaModel["location"]
    key: mod_mediaModel["key"]
    alt?: mod_mediaModel["alt"]
    width?: mod_mediaModel["width"]
    height?: mod_mediaModel["height"]
    types: mod_mediaModel["types"]
    uploaded: mod_mediaModel["uploaded"]
    modified: mod_mediaModel["modified"]
    title: mod_mediaModel["title"]
}

interface med_fileHandlerDataInp {
    file: UploadedFile
    media_doc?: mod_mediaModel
}

// updateSingleMedia
interface med_updateSingleMediaData {
    title?: mod_mediaModel["title"]
    alt?: mod_mediaModel["alt"]
}
interface med_updateSingleMediUpdateObj {
    title?: mod_mediaModel["title"]
    alt?: mod_mediaModel["alt"]
    modified: mod_mediaModel["modified"]
}