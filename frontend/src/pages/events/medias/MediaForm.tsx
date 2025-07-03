import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Divider,
    Typography,
    IconButton,
    Paper,
} from "@mui/material";
import { Plus, Save, Trash2, X, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { IMedia } from "../../../interfaces";
import { useState, useEffect } from "react";
import apiClient from "../../../apiClient";

interface IMediaFormProps {
    modalOpen: boolean;
    handleCloseModal: () => void;
    currentMedia: IMedia | null;
    medias: IMedia[];
    setMedias: (medias: IMedia[]) => void;
    eventId: number;
}

interface MediaFile {
    file: File | null;
    preview?: string;
    existingUrl?: string; // Pour les médias existants
}

const MediaForm: React.FC<IMediaFormProps> = ({
    modalOpen, 
    handleCloseModal, 
    currentMedia, 
    medias, 
    setMedias,
    eventId
}) => {
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
        { file: null }
    ]);

    // Initialiser le formulaire avec les données existantes lors de la modification
    useEffect(() => {
        if (currentMedia && modalOpen) {
            setMediaFiles([{
                file: null,
                existingUrl: currentMedia.url_media,
                preview: currentMedia.url_media
            }]);
        } else if (!currentMedia && modalOpen) {
            setMediaFiles([{ file: null }]);
        }
    }, [currentMedia, modalOpen]);

    const handleSubmit = async () => {
        if (currentMedia) {
            // Logique pour modifier un média existant
            await handleUpdateMedia();
        } else {
            // Logique pour ajouter de nouveaux médias
            await handleAddMedias();
        }
    };

    const handleUpdateMedia = async () => {
        const mediaFile = mediaFiles[0];
        
        // Si aucun nouveau fichier n'est sélectionné, on garde le média existant
        if (!mediaFile.file && mediaFile.existingUrl) {
            toast.info("Aucune modification détectée");
            handleCloseModal();
            return;
        }

        // Validation du fichier si un nouveau fichier est sélectionné
        if (mediaFile.file) {
            const isImageOrVideo = mediaFile.file.type.startsWith('image/') || mediaFile.file.type.startsWith('video/');
            
            if (!isImageOrVideo) {
                toast.error('Le fichier doit être une image ou une vidéo');
                return;
            }
        }

        try {
            const formData = new FormData();
            formData.append('id_event', eventId.toString());
            
            if (mediaFile.file) {
                formData.append('media', mediaFile.file);
            }

            // Appel API pour modifier le média
            const response = await apiClient.put(`/media/${currentMedia?.id_media}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response && response.data) {
                const updatedMedia = response.data;
                
                // Mise à jour de la liste des médias
                const updatedMedias = medias.map(media => 
                    media.id_media === currentMedia?.id_media 
                        ? {
                            id_media: updatedMedia.id_media,
                            type_media: updatedMedia.type_media,
                            url_media: updatedMedia.url_media,
                        }
                        : media
                );
                
                setMedias(updatedMedias);
                toast.success("Média modifié avec succès !");
                handleCloseModal();
                
                // Reset du formulaire
                setMediaFiles([{ file: null }]);
            } else {
                toast.error("Erreur lors de la modification du média");
            }
        } catch (error) {
            console.error('Erreur modification:', error);
            toast.error("Erreur lors de la modification du média");
        }
    };

    const handleAddMedias = async () => {
        // Validation des fichiers
        const hasEmptyFiles = mediaFiles.some(media => !media.file);
        if (hasEmptyFiles) {
            toast.error("Veuillez sélectionner tous les fichiers");
            return;
        }

        // Préparation des données pour l'API
        const formData = new FormData();
        formData.append('id_event', eventId.toString());
        
        mediaFiles.forEach((media) => {
            if (media.file) {
                formData.append('medias', media.file);
            }
        });

        try {
            // Appel API
            const response = await apiClient.post('/media', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response && response.data) {
                const result = response.data;
                
                // Mise à jour de la liste des médias avec les données du backend
                if (result.medias) {
                    const newMedias = result.medias.map((media: any) => ({
                        id_media: media.id_media,
                        type_media: media.type_media,
                        url_media: media.url_media,
                    }));

                    console.log({newMedias});
                    
                    setMedias([...medias, ...newMedias]);
                }
                
                toast.success("Médias ajoutés avec succès !");
                handleCloseModal();
                
                // Reset du formulaire
                setMediaFiles([{ file: null }]);
            } else {
                toast.error("Erreur lors de l'upload des médias");
            }
        } catch (error) {
            console.error('Erreur upload:', error);
            toast.error("Erreur lors de l'upload des médias");
        }
    };

    const addMediaField = () => {
        setMediaFiles([
            ...mediaFiles,
            { file: null }
        ]);
    };

    const removeMediaField = (index: number) => {
        const updatedMedias = mediaFiles.filter((_, i) => i !== index);
        setMediaFiles(updatedMedias);
    };

    const handleFileChange = (index: number, file: File | null) => {
        if (file) {
            const isImageOrVideo = file.type.startsWith('image/') || file.type.startsWith('video/');
            
            if (!isImageOrVideo) {
                toast.error('Le fichier doit être une image ou une vidéo');
                return;
            }

            const preview = URL.createObjectURL(file);
            
            const newMedias = [...mediaFiles];
            newMedias[index] = { 
                file: file,
                preview: preview,
                existingUrl: undefined // Effacer l'URL existante si un nouveau fichier est sélectionné
            };
            setMediaFiles(newMedias);
        }
    };

    const getFileInputAccept = () => {
        return "image/*,video/*";
    };

    const renderPreview = (media: MediaFile, index: number) => {
        const previewUrl = media.preview;
        const fileName = media.file ? media.file.name : 'Média existant';
        const fileSize = media.file ? `(${(media.file.size / 1024 / 1024).toFixed(2)} MB)` : '';

        if (!previewUrl) return null;

        // Déterminer le type de média basé sur l'URL ou le fichier
        const isImage = media.file 
            ? media.file.type.startsWith('image/') 
            : previewUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        
        const isVideo = media.file 
            ? media.file.type.startsWith('video/') 
            : previewUrl.match(/\.(mp4|webm|ogg|mov|avi)$/i);

        return (
            <Box sx={{ mt: 2, position: 'relative' }}>
                {isImage && (
                    <img 
                        src={previewUrl} 
                        alt={`Preview ${index}`}
                        style={{ 
                            width: '100%', 
                            maxHeight: '200px', 
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                    />
                )}
                {isVideo && (
                    <video 
                        src={previewUrl} 
                        controls
                        style={{ 
                            width: '100%', 
                            maxHeight: '200px',
                            borderRadius: '8px'
                        }}
                    />
                )}
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {fileName} {fileSize}
                </Typography>
            </Box>
        );
    };

    const getButtonText = (media: MediaFile) => {
        if (currentMedia && media.existingUrl && !media.file) {
            return 'Remplacer le média actuel';
        }
        if (media.file) {
            return `Fichier sélectionné: ${media.file.name}`;
        }
        return 'Choisir un fichier (image ou vidéo)';
    };

    const isFormValid = () => {
        if (currentMedia) {
            // Pour la modification, on accepte si on a un fichier existant ou un nouveau fichier
            return mediaFiles.length > 0 && (mediaFiles[0].file || mediaFiles[0].existingUrl);
        } else {
            // Pour l'ajout, tous les fichiers doivent être sélectionnés
            return !mediaFiles.some(media => !media.file);
        }
    };

    return (
        <Dialog 
            open={modalOpen} 
            onClose={handleCloseModal} 
            sx={{ backdropFilter: "blur(5px)" }}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                {currentMedia ? "Modifier le média" : "Ajouter des médias"}
            </DialogTitle>
            <DialogContent>
                {mediaFiles.map((media, index) => (
                    <Paper key={index} elevation={1} sx={{ p: 2, mb: 2 }}>
                        {mediaFiles.length > 1 && !currentMedia && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                                <IconButton 
                                    size="small"
                                    onClick={() => removeMediaField(index)}
                                    sx={{ color: 'error.main' }}
                                >
                                    <Trash2 size={16} />
                                </IconButton>
                            </Box>
                        )}
                        
                        <Box sx={{ mb: 2 }}>
                            <input
                                accept={getFileInputAccept()}
                                style={{ display: 'none' }}
                                id={`file-input-${index}`}
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    handleFileChange(index, file);
                                }}
                            />
                            <label htmlFor={`file-input-${index}`}>
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<Upload />}
                                    fullWidth
                                    sx={{ 
                                        height: '56px',
                                        borderStyle: 'dashed',
                                        borderWidth: 2,
                                        '&:hover': {
                                            borderStyle: 'dashed',
                                            borderWidth: 2,
                                        }
                                    }}
                                >
                                    {getButtonText(media)}
                                </Button>
                            </label>
                        </Box>

                        {renderPreview(media, index)}

                        {index < mediaFiles.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </Paper>
                ))}
                
                {!currentMedia && (
                    <Button 
                        variant="outlined" 
                        onClick={addMediaField} 
                        startIcon={<Plus />}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Ajouter un autre média
                    </Button>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} startIcon={<X />}>
                    Annuler
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    startIcon={<Save />}
                    variant="contained"
                    disabled={!isFormValid()}
                >
                    {currentMedia ? "Modifier" : "Sauvegarder"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MediaForm;