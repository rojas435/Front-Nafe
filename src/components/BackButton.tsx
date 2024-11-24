import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
    const [isDarkBackground, setIsDarkBackground] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkBackground = () => {
            const button = document.querySelector('#back-button');
            if (!button) return;

            let element: Element | null = button;
            let bgColor = 'rgb(255, 255, 255)';

            while (element && element !== document.body) {
                const computed = window.getComputedStyle(element);
                const backgroundColor = computed.backgroundColor;

                if (backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
                    bgColor = backgroundColor;
                    break;
                }
                element = element.parentElement;
            }

            if (!element || element === document.body) {
                bgColor = window.getComputedStyle(document.body).backgroundColor;
            }

            const rgba = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (rgba) {
                const r = parseInt(rgba[1], 10);
                const g = parseInt(rgba[2], 10);
                const b = parseInt(rgba[3], 10);

                const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                setIsDarkBackground(luminance < 0.5);
            }
        };

        checkBackground();

        const observer = new MutationObserver(checkBackground);
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true
        });

        return () => observer.disconnect();
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    const buttonStyles: React.CSSProperties = {
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        padding: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: 'transparent',
        border: `1px solid ${isDarkBackground ? 'rgba(255, 255, 255, 0.3)' : 'rgba(75, 85, 99, 0.3)'}`,
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        color: isDarkBackground ? '#ffffff' : '#1f2937',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
    };

    const svgStyles: React.CSSProperties = {
        width: '1.25rem',
        height: '1.25rem',
        color: isDarkBackground ? 'rgba(255, 255, 255, 0.9)' : '#374151',
        transition: 'transform 0.3s ease-in-out',
    };

    const textStyles: React.CSSProperties = {
        transition: 'transform 0.3s ease-in-out',
    };

    const buttonHoverStyles = `
        #back-button:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-color: ${isDarkBackground ? 'rgba(255, 255, 255, 0.5)' : 'rgba(75, 85, 99, 0.5)'};
            transform: translateX(-2px);
        }
        
        #back-button:hover svg {
            transform: translateX(-4px);
        }
        
        #back-button:hover span {
            transform: translateX(4px);
        }

        @media (max-width: 640px) {
            #back-button {
                bottom: 0.5rem;
                right: 0.5rem;
                padding: 0.5rem;
                font-size: 0.875rem;
            }
            
            #back-button svg {
                width: 1rem;
                height: 1rem;
            }
        }

        @media (max-width: 380px) {
            #back-button span {
                display: none;
            }
            
            #back-button {
                padding: 0.5rem;
            }
        }
    `;

    return (
        <>
            <style>{buttonHoverStyles}</style>
            <button
                id="back-button"
                onClick={handleGoBack}
                style={buttonStyles}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={svgStyles}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                    />
                </svg>
                <span style={textStyles}>
                    Back
                </span>
            </button>
        </>
    );
};

export default BackButton;