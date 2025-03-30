import React, { useCallback, useEffect, useState, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { endpoints } from '../constants/endpoints';

export const ProfileImage = ({ preview, onSelect }) => {
    const [src, setSrc] = useState(null);
    const [payload, setPayload] = useState(null);
    const fileInputRef = useRef(null); // Create a ref for file input

    const mounted = useCallback(() => {
        if (preview) {
            setSrc(`${endpoints.image}${preview}`);
        } else {
            setSrc(null);
        }
    }, [preview]);

    const selectedFile = (e) => {
        setPayload(e.target.files[0]);
        setSrc(URL.createObjectURL(e.target.files[0]));
        onSelect(e.target.files[0]);
    };

    useEffect(() => {
        mounted();
    }, [mounted]);

    useEffect(() => {
        if (payload) {
            const objectUrl = URL.createObjectURL(payload);
            setSrc(objectUrl);
        }
    }, [payload]);

    return (
        <div
            className="custom-profile-image"
            onClick={() => fileInputRef.current?.click()} // Use ref instead of getElementById
        >
            {!src && <PersonIcon fontSize="large" />}
            {src && (
                <img
                    src={src}
                    width={200}
                    height={100}
                    alt="preview"
                    title="preview image"
                />
            )}
            <input
                ref={fileInputRef} // Attach ref
                type="file"
                accept="image/*"
                hidden
                onChange={selectedFile}
            />
        </div>
    );
};
