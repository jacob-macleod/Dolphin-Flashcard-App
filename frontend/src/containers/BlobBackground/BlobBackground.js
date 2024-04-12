import React from 'react';
import './BlobBackground.css'
import Blob from '../../componments/Blob';


function BlobBackground() {
    return (
        <>
            <div className='filter'>
            </div>
                <div className="background">
                    <div className="backgroundPanel">
                        <Blob position={
                            {
                            float:"left",
                            marginTop: "-100px"
                            }
                        }
                        />

                        <Blob position={
                            {
                            float:"right",
                            marginTop:"25vh",
                            }
                        }
                        />

                        <Blob position={
                            {
                            float:"left",
                            marginTop: "30vh",
                            }
                        }
                        />
                    </div>
                </div>
        </>
    );
}

export default BlobBackground;