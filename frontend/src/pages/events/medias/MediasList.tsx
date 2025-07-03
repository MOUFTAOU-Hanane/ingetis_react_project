import { IconButton, List, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { AlertTriangle, Edit, Trash2 } from "lucide-react";
import { IMedia } from "../../../interfaces";

interface IMediasListProps {
    medias: IMedia[];
    handleOpenModal: (media: IMedia) => void;
    handleDeleteMedia: (mediaId: number) => void;
}

const MediasList: React.FC<IMediasListProps> = ({ medias, handleOpenModal, handleDeleteMedia }) => {
    return (
        <Box
            sx={{
                maxWidth: 700,
                margin: "auto",
                p: 4,
                background: "linear-gradient(to right, #ffffff, #f9f9f9)",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
        >
            {medias.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {medias.map((media) => {
                        const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(media.url_media);
                        const isVideo = /\.(mp4|webm|ogg)$/i.test(media.url_media);

                        return (
                            <div
                                key={media.id_media}
                                className="relative bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex-shrink-0">
                                    {isImage && (
                                        <img
                                            src={media.url_media}
                                            alt="Media"
                                            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                        />
                                    )}
                                    {isVideo && (
                                        <video controls className="w-24 h-24 rounded-lg border border-gray-200">
                                            <source src={media.url_media} type="video/mp4" />
                                            Votre navigateur ne supporte pas les vidéos.
                                        </video>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <ListItemText
                                        primary={media.type_media}
                                        primaryTypographyProps={{
                                            className: "font-semibold text-gray-800",
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 items-center">
                                    <IconButton onClick={() => handleOpenModal(media)} className="hover:scale-110 transition">
                                        <Edit size={20} color="blue" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteMedia(media.id_media)} className="hover:scale-110 transition">
                                        <Trash2 size={20} color="red" />
                                    </IconButton>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex gap-2 items-center justify-center text-center">
                    <AlertTriangle color="red" size={20} />
                    <span className="text-red-500 font-medium">
                        Veuillez ajouter des médias pour valider votre évènement
                    </span>
                </div>
            )}
        </Box>
    );
};

export default MediasList;
