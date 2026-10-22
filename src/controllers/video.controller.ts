import type { Request, Response } from "express";
import { changeCollections, changeVideos, collections, videos } from "../data/.data.js";
import type { CollectionT, InnerCollectionT, VideoT } from "../models/video.models.js";


const innerCollectionToCollection= (collection: InnerCollectionT) => {
    const realVideos = collection.videosCollection.map((x)=>videos.find(y=>y.id === x)).filter(z=>z!=undefined)

    const collectionFinal: CollectionT = {
        id: collection.id,
        titles: realVideos,
        LaserDiscTitles: realVideos.filter(x=>x.format==="LD"),
        VHStitles: realVideos.filter(x=>x.format==="VHS"),
        owner: collection.owner,
        PALtitles: realVideos.filter(x=>x.regionColor==="PAL"),
        NTSCtitles: realVideos.filter(x=>x.regionColor==="NTSC")
    }

    return collectionFinal;
}



const findInnerCollection= (id: number, res: Response) => {
    const collection = collections.find((x) => x.id === id);
    
    if (!collection){
        res.status(404).json({
            message: "No se encuentra la collection"
        });
        return;
    }

    return collection;
};

const findVideo= (id: number, res: Response) => {
    const video = videos.find((x) => x.id === id);
    
    if (!video){
        res.status(404).json({
            message: "No se encuentra la video"
        });
        return;
    }

    return video;
};


export const getCollection = (
    req: Request,
    res: Response
) => {
    const collecciones = collections.map((x) => innerCollectionToCollection(x))
    
    res.json(collecciones);
};

export const getCollectionWithId = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const collection = findInnerCollection(id, res);

    if (!collection){
        return
    }

    res.json(innerCollectionToCollection(collection));
};


export const getVideo = (
    req: Request,
    res: Response
) => {
    res.json(videos);
};

export const getVideoWithId = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const video = findVideo(id, res);

    res.json(video);
};


export const postVideo = (
    req: Request,
    res: Response
) => {

    if(!req.body){
        res.status(400).json({
            message: "Me tienes que pasar algo"
        });
        return;
    };

    if(!req.body.regionColor || !req.body.format || !req.body.runtime || !req.body.playType){
        res.status(400).json({
            message: "Faltan parámetros"
        });
        return;
    };

    const newVideo: VideoT = {
        id: Math.random(),
        regionColor: req.body.regionColor,
        format: req.body.format,
        runtime: req.body.runtime,
        playType: req.body.playType
    };

    changeVideos([...videos,newVideo]);

    res.status(201).json({
        message: "Se ha creado correctamente",
        newVideo
    });
};


export const postCollection = (
    req: Request,
    res: Response
) => {

    if(!req.body){
        res.status(400).json({
            message: "Me tienes que pasar algo"
        });
        return;
    };

    if(!req.body.owner){
        res.status(400).json({
            message: "Falta el owner"
        });
        return;
    };

    const newCollection: InnerCollectionT = {
        id: Math.random(),
        owner: req.body.owner,
        videosCollection: []
    };

    changeCollections([...collections,newCollection]);

    res.status(201).json({
        message: "Se ha creado correctamente",
        newCollection
    });
};


export const putCollection = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);
    const idVideo = Number(req.params.VideoId);

    const collection = findInnerCollection(id, res);
    const video = findVideo(idVideo, res)

    if(collection && video){
        
        if(!collection.videosCollection.find(id => id === idVideo)){
            const newCollection: InnerCollectionT = {
                id: collection.id,
                owner: collection.owner,
                videosCollection: [...collection.videosCollection, idVideo]
            };
            
            changeCollections(collections.map((x) => x.id === id ? newCollection : x))

            res.status(200).json({
                message: "Se ha creado correctamente",
                newCollection
            });
        } else {
            res.status(200).json({
                message: "Ese video ya está en la collección"
            });
        }

    }

};


export const deleteVideo = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);
    
    const video = findVideo(id, res);

    if(video){
        changeVideos(videos.filter((x) => x.id !== id))
        const coleccionesActualizadas = collections.map(col => {
            return {
                ...col,musicaIds: col.videosCollection.filter(idMusica => idMusica !== id)
            };
        });
        changeCollections(coleccionesActualizadas);
        res.json({
            message: `El video "${video?.id}" ha sido eliminado`
        });

    }

};


export const deleteCollection = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);
    
    const collection = findInnerCollection(id, res);

    if(collection){
        changeCollections(collections.filter((x) => x.id !== id))
        res.json({
            message: `La collección de "${collection?.owner}" ha sido eliminada`
        });
    }
};
