import { NavLink, useParams } from "react-router-dom";
import { Chip } from "@mui/material";
import { AlertTriangle, ExternalLink } from "lucide-react";

const EventInfo = ({ eventSelected, actualPage }: { eventSelected: any; actualPage: string }) => {
    const { id } = useParams();

    // Définition dynamique des éléments
    const elements = [
        { key: "catalogs", label: "Catalogues", color: "#FFB300" },
        { key: "programs", label: "Programmes", color: "#FFB300" },
        { key: "medias", label: "Médias", color: "#FFB300" }, // Ajouté pour illustrer la flexibilité
    ].filter((element) => element.key !== actualPage);

    return (
        <div className="mb-4">
            <div className="flex gap-2 mb-4">
                {elements.map(({ key, label, color }) => (
                    <div key={key}>
                        <Chip
                            label={
                                <span className="flex gap-1 items-center">
                                    {!eventSelected?.[key]?.length && <AlertTriangle color="red" size={20} />}
                                    {label}
                                    <NavLink
                                        to={`/events/${id}/${key}`}
                                        style={{ color: "inherit", textDecoration: "none" }}
                                    >
                                        <ExternalLink size={15} />
                                    </NavLink>
                                </span>
                            }
                            sx={{
                                backgroundColor: color,
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                fontSize: "medium",
                                "&:hover": {
                                    backgroundColor: "#FF8F00",
                                    transform: "scale(1.05)",
                                    transition: "all 0.3s ease",
                                },
                            }}
                            title="Obligatoire"
                        />
                    </div>
                ))}
            </div>
            <div>
                <span className="text-xs flex text-red-800">
                    <AlertTriangle color="red" size={15} /> : Ce n'est pas encore complet
                </span>
            </div>
        </div>
    );
};

export default EventInfo;
