import React from "react";
import { IUser } from "../interfaces";

interface UserAvatarProps {
    user: IUser;
    size?: "sm" | "md" | "lg";
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = "md" }) => {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16"
    };

    return (
        <img
            src={`http://localhost:3005${user.photo}`}
            alt={user.nom}
            className={`${sizeClasses[size]} rounded-full object-cover`}
        />
    );
};

export default UserAvatar;