import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ViewProps {
    name: string
    onClick(): void
}
const IconsFactory: React.FC<ViewProps> = (props) => {

    switch (props.name) {
        case 'edit':
            return <FaEdit onClick={props.onClick} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
        case 'remove':
            return <FaTrash onClick={props.onClick} className="text-red-500 hover:text-red-700 cursor-pointer" />
        default:
            return <div />
    }
}

export default IconsFactory;
