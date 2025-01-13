import React, { useCallback, useEffect, useState } from 'react'

import PersonIcon from '@mui/icons-material/Person';
import { endpoints } from '../constants/endpoints';

export const ProfileImage = ({ preview, onSelect }) => {
    
    const [src, setSrc] = useState(null);
    const [payload, setPayload] = useState(null);

    const mounted = useCallback(() => {
        if (preview) {
            setSrc(`${endpoints.image}${preview}`);
        } else {
            setSrc(null); // Reset src if preview is null
        }
    }, [preview]);

    const selectedFile = (e) => {
        setPayload(e.target.files[0]);
        setSrc(URL.createObjectURL(e.target.files[0])); // Update the src when a new file is selected
        onSelect(e.target.files[0]);
    }

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
        <>

            <div
                className="custom-profile-image"
                onClick={() => {
                    document.getElementById("profile").click();
                }}
            >
                {!src && <PersonIcon fontSize="large"/>}
                {src && (
                    <img
                        src={src}
                        width={200}
                        height={100}

                        alt='preview'
                        title='preview image'
                    />
                )}
                <input
                    id="profile"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => selectedFile(e)}
                />
            </div>
        </>
    )
}