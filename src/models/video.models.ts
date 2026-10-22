
export type VideoT = {
    id: number,
    regionColor: "NTSC" | "PAL",
    format: "LD" | "VHS",
    runtime: number,
    playType: "LP" | "SP" | "CLU" | "CAV"
}

export type CollectionT = {
    id: number,
    titles: VideoT[],
    LaserDiscTitles: VideoT[],
    VHStitles: VideoT[],
    owner: string,
    PALtitles: VideoT[],
    NTSCtitles: VideoT[]
}

export type InnerCollectionT = {
    id: number,
    owner: string,
    videosCollection: number[]
}