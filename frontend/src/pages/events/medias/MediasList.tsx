import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { AlertTriangle, Edit, Trash2 } from "lucide-react";
import { IMedia } from "../../../interfaces";

interface IMediasListProps {
    medias: IMedia[];
    handleOpenModal: (media: IMedia) => void;
    handleDeleteMedia: (mediaId: number) => void;
}

const MediasList: React.FC<IMediasListProps> = ({medias, handleOpenModal, handleDeleteMedia}) => {
    return (
        <Box sx={{ maxWidth: 600, margin: "auto", p: 3, backgroundColor: "white", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <List>
                {medias.length > 0 ? medias.map((media) => {
                    const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(media.url_media);
                    const isVideo = /\.(mp4|webm|ogg)$/i.test(media.url_media);

                    return (
                        <ListItem
                            key={media.id_media}
                            secondaryAction={
                                <>
                                    <IconButton edge="end" onClick={() => handleOpenModal(media)}>
                                        <Edit size={20} color="blue" />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDeleteMedia(media.id_media)}>
                                        <Trash2 size={20} color="red" />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText primary={media.type_media} />
                            {isImage && <img src={`http://localhost:3005${media.url_media}`} alt="Media" className="w-20 h-20 object-cover rounded-md" />}
                            {isVideo && (
                                <video controls className="w-20 h-20 rounded-md">
                                    <source src={media.url_media} type="video/mp4" />
                                    Votre navigateur ne supporte pas la lecture de vidéos.
                                </video>
                            )}
                        </ListItem>
                    );
                }) : (
                    <div className="flex gap-2 items-center justify-center">
                        <AlertTriangle color="red" size={20} />
                        <span className="text-red-500">Veuillez ajouter des médias pour valider votre évènement</span>
                    </div>
                )}
            </List>


        </Box>
    )
}

export default MediasList;