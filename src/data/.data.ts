import type { InnerCollectionT, VideoT } from "../models/video.models.js";



export let collections: InnerCollectionT[] = [
    {
        id: 1,
        owner: "Javier",
        videosCollection: [1,2,3,6]
    },
    {
        id: 2,
        owner: "Miguel",
        videosCollection: [2,6,4,1]
    },
    {
        id: 3,
        owner: "Enrique",
        videosCollection: [5,4,6,2]
    }
];


export let videos: VideoT[] = [
    {
        id: 1,
        regionColor: "NTSC",
        format: "LD",
        runtime: 200,
        playType: "LP"
    },
    {
        id: 2,
        regionColor: "PAL",
        format: "LD",
        runtime: 180,
        playType: "SP"
    },
    {
        id: 3,
        regionColor: "NTSC",
        format: "VHS",
        runtime: 150,
        playType: "CLU"
    },
    {
        id: 4,
        regionColor: "PAL",
        format: "VHS",
        runtime: 100,
        playType: "CAV"
    },
    {
        id: 5,
        regionColor: "NTSC",
        format: "LD",
        runtime: 300,
        playType: "LP"
    },
    {
        id: 6,
        regionColor: "PAL",
        format: "VHS",
        runtime: 130,
        playType: "SP"
    }
]


export const changeVideos = (newVideos: VideoT[]) => {
    videos = newVideos;
}

export const changeCollections = (newCollections: InnerCollectionT[]) => {
    collections = newCollections;
}